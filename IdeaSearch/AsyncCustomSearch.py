"""Simple command-line example for Custom Search.
Command-line application that does a search.
"""

import asyncio
import aiohttp


SEARCH_ID = '000966773646607521961:v3kbrwiec88'
DEV_KEY = "AIzaSyCwtSyr1En5OSmRT4US2u15QrS0L6B58-k"
URL = "https://www.googleapis.com/customsearch/v1"


class AsyncCustomSearch:
    def __init__(self, query: str):
        self.params = {'key': DEV_KEY, 'cx': SEARCH_ID, 'q': query}

    async def get_results(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(URL, params=self.params) as response:
                return await response.json()


async def main():
    newquery = AsyncCustomSearch("ideation research")
    results = await newquery.get_results()
    print(results)


if __name__ == '__main__':
    asyncio.run(main())
