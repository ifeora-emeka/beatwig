import { getPopularMovies, getPopularSeries } from "@/app/api/public/film/film.api";
import { getAllFootballSchedule } from "@/app/api/public/sports/sport.api";


export async function GET(): Promise<Response> {
    try {
        let movies: any[] = await getPopularMovies();
        let series: any[] = await getPopularSeries();
        let football_lineup : any[] = await getAllFootballSchedule();

        return Response.json({ movies, series, football_lineup }, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
};

