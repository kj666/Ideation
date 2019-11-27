"""Simple command-line example for Custom Search.
Command-line application that does a search.
"""

import asyncio
import pprint

import aiohttp

SEARCH_ID = '000966773646607521961:v3kbrwiec88'
DEV_KEY = "AIzaSyCwtSyr1En5OSmRT4US2u15QrS0L6B58-k"
URL = "https://www.googleapis.com/customsearch/v1"


class AsyncCustomSearch:
    def __init__(self, query: str, start_index: int = 0):
        self.params = {'key': DEV_KEY, 'cx': SEARCH_ID, 'q': query}
        if start_index > 0:
            self.params['start'] = start_index

    async def get_raw_results(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(URL, params=self.params) as response:
                return await response.json()

    async def get_processed_results(self):
        raw_results = await self.get_raw_results()
        links = []
        next_page = 0
        # TODO: Handle corrected queries
        try:
            if 'items' in raw_results:
                links = [{'link': item['link'],
                          'title': item['title'],
                          'snippet': item['snippet']} for item in raw_results['items']]
            if 'nextPage' in raw_results['queries']:
                next_page = raw_results['queries']['nextPage'][0]['startIndex']
        except KeyError:
            pass
        return {'links': links,
                'nextPage': next_page}


async def main():
    newquery = AsyncCustomSearch("godliness+brickkiln+badged+shell+decocted+monumentalize+", 0)
    results = await newquery.get_processed_results()
    pretty = pprint.PrettyPrinter()
    pretty.pprint(results)


if __name__ == '__main__':
    asyncio.run(main())
