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
    const { data: html } = await axios.get(`${movies_site_algorithm}/tv`);
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
}


function extractFilmIdFromSlug(slug: string): string {
    let result = slug.split("/");
    let _slug = result[result.length - 1];
    return _slug.split("-")[0];
}

