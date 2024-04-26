import { getPopularSeries } from "@/app/api/public/film/film.api";


export async function GET() {
    try {
        let allMovies = await getPopularSeries()

        return Response.json({ allMovies }, { status: 200 });
    } catch (e) {
        return Response.json({ allMovies: [] }, { status: 500 });
    }
}



