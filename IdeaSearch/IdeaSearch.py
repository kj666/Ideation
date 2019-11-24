from aiohttp import web
import async_custom_search

app = web.Application()
routes = web.RouteTableDef()


@routes.get('/')
async def get_search_results(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


@routes.get('/search-keywords')
async def get_handler(request):
    params = await request.json()
    query = async_custom_search.AsyncCustomSearch(params['query'], int(params['startIndex']))
    return web.json_response(await query.get_processed_results())


@routes.get('/crawl-link')
async def get_handler(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Goodbye, " + name
    return web.Response(text=text)


app.add_routes(routes)

if __name__ == '__main__':
    web.run_app(app)
