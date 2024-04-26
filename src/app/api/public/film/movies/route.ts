import { getPopularMovies } from "@/app/api/public/film/film.api";


export async function GET(): Promise<Response> {
    try {
        let results: any[] = await getPopularMovies();
        return Response.json({ results }, { status: 200 });
    } catch (e) {
        return Response.json({ results: [] }, { status: 500 });
    }
};

