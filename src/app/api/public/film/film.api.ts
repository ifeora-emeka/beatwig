import axios from "axios";
import { movies_site_algorithm } from "@/constants";
import cheerio from "cheerio";
import { FilmData } from "@/types/film.types";


export const getPopularMovies = async () => {
    try {
        const { data: html } = await axios.get(`${movies_site_algorithm}/movie`);
        const $ = cheerio.load(html);

        let allMovies: FilmData[] = [];

        $('.page_wrapper .card.style_1').each((index, element) => {
            const movieElement = $(element);
            const poster = movieElement.find('.poster').attr('src');
            const title = movieElement.find('h2 a').text();
            const date = movieElement.find('.content p').text();
            const slug = movieElement.find('h2 a').attr('href');

            const filmId = slug ? extractFilmIdFromSlug(slug) : '';

            const movie: FilmData = {
                film_id: filmId,
                poster: poster || '',
                title: title.trim(),
                date: date.trim(),
                slug: slug || '',
                type: 'movie',
            };

            if (filmId && movie.title) {
                allMovies.push(movie);
            }
        });

        return allMovies
    } catch (e) {
        return Promise.reject(e)
    }
};


export const getPopularSeries = async () => {
    const { data: html } = await axios.get(`${movies_site_algorithm}/tv/on-the-air`);
    const $ = cheerio.load(html);

    let allMovies: FilmData[] = [];

    $('.page_wrapper .card.style_1').each((index, element) => {
        const movieElement = $(element);
        const poster = movieElement.find('.poster').attr('src');
        const title = movieElement.find('h2 a').text();
        const date = movieElement.find('.content p').text();
        const slug = movieElement.find('h2 a').attr('href');

        const filmId = slug ? extractFilmIdFromSlug(slug) : '';

        const movie: FilmData = {
            film_id: filmId,
            poster: poster || '',
            title: title.trim(),
            date: date.trim(),
            slug: slug || '',
            type: 'tv',
        };

        if (filmId && movie.title) {
            allMovies.push(movie);
        }
    });

    return allMovies
};

export async function getFilmDetails({ film_slug, film_type }: { film_slug: string; film_type: string }) {
    try {
        // console.log('THE URL:::', `${movies_site_algorithm}/${film_type}/${film_slug}`)
        const { data: html } = await axios.get(`${movies_site_algorithm}/${film_type}/${film_slug}`);
        const $ = cheerio.load(html);

        const poster = $('.header.large.border.first .poster img').attr('src') || '';
        const title = $('.header.large.border.first .header.poster h2 a').text() || '';
        const certification = $('.header.large.border.first .header.poster .certification').text().trim() || '';
        const release = $('.header.large.border.first .header.poster .release').text().trim() || '';
        const genres = $('.header.large.border.first .header.poster .genres a').map((_, element) => $(element).text()).get() || [];
        const runtime = $('.header.large.border.first .header.poster .runtime').text().trim() || '';
        const tagline = $('.header.large.border.first .header_info .tagline').text().trim() || '';
        const overview = $('.header.large.border.first .header_info .overview p').text().trim() || '';
        const people = $('.header.large.border.first .header_info .people .profile').map((_, element) => {
            const name = $(element).find('a').text().trim();
            const role = $(element).find('.character').text().trim();
            return { name, role };
        }).get() || [];

        let backdrop = '';

        $('.backdrop img').each((_, element) => {
            backdrop = $(element).attr('src') || '';
            return false;
        });

        const filmDetails = {
            poster,
            title,
            certification,
            release,
            genres,
            runtime,
            tagline,
            overview,
            people,
            backdrop,
        };

        return filmDetails;
    } catch (error) {
        return Promise.reject(error);
    }
};



function extractFilmIdFromSlug(slug: string): string {
    let result = slug.split("/");
    let _slug = result[result.length - 1];
    return _slug.split("-")[0];
}

