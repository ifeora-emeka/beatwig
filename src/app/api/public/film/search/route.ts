import axios from "axios";
import { movies_site_algorithm } from "@/constants";
import cheerio from "cheerio";
import { FilmData } from "@/types/film.types";


export async function POST(req: Request) {
    try {
        const { keyword, type } = await req.json();
        const { data: html } = await axios.get(`${movies_site_algorithm}/search/${type}?query=${keyword}`);
        const $ = cheerio.load(html);

        const films: FilmData[] = [];

        $(`.search_results .${type} .results .card`).each((index, element) => {
            const film_id = $(element).attr('id')?.replace('card_tv_', '') || '';
            const poster = $(element).find('.poster img').attr('src') || '';
            const title = $(element).find('.title h2').text().trim();
            const date = $(element).find('.release_date').text().trim();
            const slug = $(element).find('.result').attr('href') || '';
            const type = slug.includes('/tv/') ? 'tv' : 'movie';
            const overview = $(element).find('.overview p').text().trim();

            const film: FilmData = {
                film_id,
                poster,
                title,
                date,
                slug,
                type,
                overview,
            };

            films.push(film);
        });

        return Response.json({ result: films }, { status: 200 });
    } catch (e) {
        console.log('the error:::', e)
        return Response.json({ message: "Internal server error!" }, { status: 500 });
    }
}