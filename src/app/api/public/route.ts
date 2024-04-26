import { getPopularMovies, getPopularSeries } from "@/app/api/public/film/film.api";


export async function GET(): Promise<Response> {
    try {
        let movies: any[] = await getPopularMovies();
        let series: any[] = await getPopularSeries()

        return Response.json({ movies, series, lineupData: [] }, { status: 200 });
    } catch (e) {
        return Response.json({ results: [], series: [], lineupData: [] }, { status: 500 });
    }
};

