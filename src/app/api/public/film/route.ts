import { scrapeSearch } from "@/app/api/public/film/film.api";

export async function POST(req:Request) {
    try {
        let { keyword } = await req.json()
        let series = await scrapeSearch({
            type: "tv",
            keyword: keyword,
        });
        let movies = await scrapeSearch({
            type: "movie",
            keyword: keyword
        });
        return Response.json({ movies, series }, { status: 200 });
    } catch (e) {
        console.log('SEARCH ERROR:::', e)
        return Response.json({ message: "Internal server error!" }, { status: 500 });
    }
}
