import asyncio
import pprint
import re
from urllib.parse import urljoin

import aiohttp
from bs4 import BeautifulSoup

selflink_re = re.compile(r'^(https?://)?(?!(#|mailto|((.*\..+/)?.*[?:].*))).*$')
linkoffset_re = re.compile(r'#.*$')


class AsyncLinkScraper:
    def __init__(self, link: str, query: str):
        self.link = link
        self.query = query

    async def get_links(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(self.link) as response:
                page = await response.text()
        soup = BeautifulSoup(page, 'lxml').find('body')
        links = set()
        [[links.add(re.sub(linkoffset_re, "", link['href'])) for link in div.find_all('a', href=selflink_re)
          if link is not None] for div in [d for d in soup.find_all('div') if len(d.find_all(['p', 'br'])) > 1]]
        links = [urljoin(self.link, link) for link in links]
        return links


async def main():
    newquery = AsyncLinkScraper("https://arstechnica.com/tech-policy/2019/11/"
                                "nyc-wants-a-chief-algorithm-officer-to-counter-bias-build-transparency/", "")
    results = await newquery.get_links()
    pretty = pprint.PrettyPrinter()
    pretty.pprint(results)


if __name__ == '__main__':
    asyncio.run(main())
