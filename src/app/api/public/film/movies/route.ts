import { getFilmDetails, getPopularMovies } from "@/app/api/public/film/film.api";


export async function GET(): Promise<Response> {
    try {
        let results: any[] = await getPopularMovies();
        return Response.json({ results }, { status: 200 });
    } catch (e) {
        return Response.json({ results: [] }, { status: 500 });
    }
};

export async function POST(req:Request) {
    try {
        let { film_slug, film_type } = await req.json()
        let result = await  getFilmDetails({
            film_slug,
            film_type
        });
        return Response.json({ result }, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error!" }, { status: 500 });
    }
}
