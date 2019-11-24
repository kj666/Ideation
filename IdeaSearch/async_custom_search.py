"""Simple command-line example for Custom Search.
Command-line application that does a search.
"""

import pprint
import asyncio
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
        return {'links': [{'link': item['link'],
                           'title': item['title'],
                           'snippet': item['snippet']} for item in raw_results['items']],
                'nextPage': raw_results['queries']['nextPage'][0]['startIndex']}


async def main():
    newquery = AsyncCustomSearch("ideation research")
    results = await newquery.get_processed_results()
    pretty = pprint.PrettyPrinter()
    pretty.pprint(results)


if __name__ == '__main__':
    asyncio.run(main())
