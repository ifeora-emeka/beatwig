import axios from "axios";
import { movies_site_algorithm } from "@/constants";
import cheerio from "cheerio";
import { FilmData } from "@/types/film.types";
import { shuffleArray } from "@/utils/index.utils";


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
        const { data: html } = await axios.get(`${movies_site_algorithm}/${film_type}/${film_slug}`);
        const $ = cheerio.load(html);

        const poster = $('.header.large.border.first .poster img').attr('src') || '';
        const title = $('.header.large.border.first .header.poster h2 a').text() || '';
        const certification = $('.header.large.border.first .header.poster .certification').text().trim() || '';
        const release = $('.header.large.border.first .header.poster .release').text().trim() || '';

        // Extract genres with hrefs
        const genres: { name: string; slug: string }[] = [];
        $('.header.large.border.first .header.poster .genres a').each((_, element) => {
            const name = $(element).text().trim();
            const href = $(element).attr('href') || '';
            genres.push({ name, slug: href });
        });

        const runtime = $('.header.large.border.first .header.poster .runtime').text().trim() || '';
        const tagline = $('.header.large.border.first .header_info .tagline').text().trim() || '';
        const overview = $('.header.large.border.first .header_info .overview p').text().trim() || '';
        const people = $('.panel.top_billed .people .card').map((_, element) => {
            const name = $(element).find('a').text().trim();
            const role = $(element).find('.character').text().trim();
            const image = $(element).find('.profile img').attr('src') || '';
            return { name, role, image };
        }).get() || [];

        let backdrop = '';
        $('.backdrop img').each((_, element) => {
            backdrop = $(element).attr('src') || '';
            return false;
        });

        const additionalInfo: { [key: string]: string } = {};
        $('.facts.left_column p').each((_, element) => {
            const key = $(element).find('strong bdi').text().trim();
            const value = $(element).clone().children().remove().end().text().trim();
            additionalInfo[key] = value;
        });

        // Extract specific details
        const { Status, 'Original Language': OriginalLanguage, Budget, Revenue } = additionalInfo;

        let recommendations = await getMovieRecommendations(genres?.length > 2 ? genres[1]?.slug : genres[0]?.slug);


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
            info: {
                status: Status || '',
                language: OriginalLanguage || '',
                budget: Budget || '',
                revenue: Revenue || '',
            },
            recommendations
        };

        return filmDetails;
    } catch (error) {
        console.log('\n\n')
        console.log('\n\n')
        console.log('GET MOVIE DETAILS ERROR:::', error)
        console.log('\n\n');
        console.log('\n\n');
        return Promise.reject(error);
    }
};


export async function getMovieRecommendations(slug: string) {
    if (!slug) {
        return [];
    }


    try {
        const { data: html } = await axios.get(`${movies_site_algorithm}/${slug}?sort_by=popularity.desc`);
        const $ = cheerio.load(html);

        const moviesData = $('.card.v4.tight').map((_, element) => {
            const poster = $(element).find('.poster img').attr('src');
            const titleElement = $(element).find('.title a h2');
            const title = titleElement.text();
            const slug = $(element).find('.title a').attr('href');
            const releaseDate = $(element).find('.release_date').text();
            const overview = $(element).find('.overview p').text();

            return { poster, title, slug: slug || "", date: releaseDate, overview };
        }).get();

        return shuffleArray(moviesData);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


export async function scrapeSearch({keyword, type}:{type:string; keyword:string}) {
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

    return films
}


export function extractFilmIdFromSlug(slug: string): string {
    let result = slug.split("/");
    let _slug = result[result.length - 1];
    return _slug.split("-")[0];
}

