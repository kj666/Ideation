import argparse
import json
import logging

from aiohttp import web

import async_custom_search
import async_link_scraper

DEFAULT_PORT = 8888


def server_setup():
    logging.basicConfig(format='%(asctime)s - %(message)s',
                        datefmt='%d-%b-%y %H:%M:%S', level=logging.INFO)
    a = web.Application()
    routes = web.RouteTableDef()

    @routes.get('/')
    async def get_default(request):
        name = request.match_info.get('name', "Anonymous")
        text = "Hello, " + name
        return web.Response(text=text)

    @routes.get('/search-keywords')
    async def get_search_results(request):
        try:
            params = await request.json()
            query = async_custom_search.AsyncCustomSearch(params['query'], int(params['startIndex']))
        except (json.decoder.JSONDecodeError, KeyError):
            logging.error("Invalid JSON body received")
            raise web.HTTPBadRequest()

        return web.json_response(await query.get_processed_results())

    @routes.get('/scrape-link')
    async def get_scraped_link(request):
        try:
            params = await request.json()
            scraper = async_link_scraper.AsyncLinkScraper(params['link'], params['query'])
        except (json.decoder.JSONDecodeError, KeyError):
            logging.error("Invalid JSON body received")
            raise web.HTTPBadRequest()

        return web.json_response(await scraper.get_links())

    a.add_routes(routes)
    return a


def parser_setup():
    p = argparse.ArgumentParser(description="IdeaSearch")

    p.add_argument("--local", action="store_true",
                   help="Bind server to local interface only")

    class PortAction(argparse.Action):
        def __call__(self, prsr, namespace, port, option_string=None):
            if port < 0 or port > 65535:
                prsr.error(f"{option_string} must be between 0 and 65535")

            setattr(namespace, self.dest, port)

    p.add_argument("-p", "--port", action=PortAction, type=int, default=DEFAULT_PORT,
                   help=f"specify port, defaults to {DEFAULT_PORT}")
    return p


if __name__ == '__main__':
    parser = parser_setup()
    args = parser.parse_args()
    app = server_setup()
    web.run_app(app, host="127.0.0.1" if args.local else None, port=args.port)
