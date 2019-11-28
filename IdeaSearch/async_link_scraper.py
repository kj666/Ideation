import asyncio
import pprint
import re
from random import shuffle
from urllib.parse import urljoin

import aiohttp
from bs4 import BeautifulSoup, Tag

selflink_re = re.compile(r'^(https?://)?(www\.)?(?!(#|mailto|twitter((.*\..+/)?.*\?.*))).*$')
linkoffset_re = re.compile(r'#.*$')

tag_blacklist = {
    '[document]',
    'noscript',
    'header',
    'html',
    'meta',
    'head',
    'input',
    'script',
    'footer',
    'foot',
    'style',
    'aside',
    'sidebar'
}

class_blacklist = [
    'script',
    'head',
    'meta',
    'input',
    'foot',
    'style',
    'aside',
    'side',
    'bar',
    'nav',
    'share'
]

id_blacklist = [
    'script',
    'head',
    'meta',
    'input',
    'foot',
    'style',
    'aside',
    'side',
    'bar',
    'nav',
    'share'
]


class AsyncLinkScraper:
    def __init__(self, link: str, query: str):
        self.link = link
        self.query = query

    async def get_links(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(self.link) as response:
                page = await response.text()
        soup = BeautifulSoup(page, 'lxml').body
        div = AsyncLinkScraper._navigate(soup)

        links = set()
        [links.add(re.sub(linkoffset_re, "", link['href'])) for link in div.find_all('a', style=False, href=selflink_re)
         if link is not None]
        links = [urljoin(self.link, link) for link in links]
        shuffle(links)
        return {'links': [{'link': link, 'title': "", 'snippet': ""} for link in links[:10]],
                'nextPage': 0}

    @staticmethod
    def _navigate(soup):
        target = len(soup.find_all(['p', 'br']))
        children = [c for c in soup.children if isinstance(c, Tag) and c.name not in tag_blacklist]
        big_c_tags = target
        big_c = None

        while big_c_tags >= target // 2:
            c_it = iter(children)
            big_c = next(c_it)
            big_c_tags = len(big_c.find_all(['p', 'br']))

            for c in c_it:
                c_tags = len(c.find_all(['p', 'br']))
                if c_tags >= big_c_tags and not AsyncLinkScraper._blacklisted(c):
                    big_c = c
                    big_c_tags = c_tags
                    if c_tags == target:
                        break
            children = [c for c in big_c.children if isinstance(c, Tag) and c.name not in tag_blacklist]

        return big_c

    @staticmethod
    def _blacklisted(e):
        e_c = e.get('class')
        e_id = e.get('id')

        if e_c is not None and any(word in e_c for word in class_blacklist):
            return True
        if e_id is not None and any(word in e_id for word in id_blacklist):
            return True
        return False


async def main():
    newquery = AsyncLinkScraper("https://arstechnica.com/science/2019/11/"
                                "that-time-benjamin-franklin-tried-and-failed-to-electrocute-a-turkey/", "")
    results = await newquery.get_links()
    pretty = pprint.PrettyPrinter()
    pretty.pprint(results)


if __name__ == '__main__':
    asyncio.run(main())
