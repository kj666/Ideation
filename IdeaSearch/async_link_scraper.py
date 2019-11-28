import asyncio
import pprint
import re
from random import shuffle
from urllib.parse import urljoin

import aiohttp
from bs4 import BeautifulSoup, Tag

selflink_re = re.compile(r'^(https?://)?(www\.)?(?!(#|mailto|twitter|facebook|instagram|((.*\..+/)?.*[?:].*))).*$')
linkoffset_re = re.compile(r'#.*$')

blacklist = {'[document]',
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
             'sidebar'}


class AsyncLinkScraper:
    def __init__(self, link: str, query: str):
        self.link = link
        self.query = query

    async def get_links(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(self.link) as response:
                page = await response.text()
        soup = BeautifulSoup(page, 'lxml').body
        div = self._navigate(soup)

        links = set()
        [links.add(re.sub(linkoffset_re, "", link['href'])) for link in div.find_all('a', style=False, href=selflink_re)
         if link is not None]
        links = [urljoin(self.link, link) for link in links]
        shuffle(links)
        return links[:10]

    @staticmethod
    def _navigate(soup):
        target = len(soup.find_all(['p', 'br']))
        children = [c for c in soup.children if isinstance(c, Tag) and c.name not in blacklist]
        big_c_tags = target
        big_c = None

        while big_c_tags >= target // 2:
            c_it = iter(children)
            big_c = next(c_it)
            big_c_tags = len(big_c.find_all(['p', 'br']))

            for c in c_it:
                c_tags = len(c.find_all(['p', 'br']))
                if c_tags >= big_c_tags:
                    big_c = c
                    big_c_tags = c_tags
                    if c_tags == target:
                        break
            children = [c for c in big_c.children if isinstance(c, Tag) and c.name not in blacklist]

        return big_c.parent


async def main():
    newquery = AsyncLinkScraper("https://en.wikipedia.org/wiki/Mutter_Courage_und_ihre_Kinder_(film)", "")
    results = await newquery.get_links()
    pretty = pprint.PrettyPrinter()
    pretty.pprint(results)


if __name__ == '__main__':
    asyncio.run(main())
