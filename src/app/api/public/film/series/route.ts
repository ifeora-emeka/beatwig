import { getPopularSeries } from "@/app/api/public/film/film.api";
import { getSeriesEpisodes, getSeriesSeasons } from "@/app/api/public/film/series/series.api";


export async function GET() {
    try {
        let allMovies = await getPopularSeries()

        return Response.json({ allMovies }, { status: 200 });
    } catch (e) {
        return Response.json({ allMovies: [] }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {

        let { season, slug } = await req.json();

        let seasonsResult = await getSeriesSeasons(slug);
        let episodesResult = season ? await  getSeriesEpisodes({ slug, season }) : [];

        return Response.json({ seasons: seasonsResult, episodes: episodesResult }, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

