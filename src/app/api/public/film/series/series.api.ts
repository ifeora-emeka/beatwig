import axios from "axios";
import { movies_site_algorithm } from "@/constants";
import cheerio from "cheerio";


export async function getSeriesEpisodes({ slug, season }: {slug: string; season: string;}) {
    try {
        const { data: html } = await axios.get(`${movies_site_algorithm}/${slug}/season/${season || 1}`);
        const $ = cheerio.load(html);

        const episodes: any[] = [];

        $('.episode_list .card').each((index, element) => {
            const episodeNumber = $(element).find('.title .episode_number').text().trim();
            const title = $(element).find('.title .episode_title h3 a').text().trim();
            const rating = $(element).find('.title .rating_border .rating').text().trim();
            const date = $(element).find('.title .date .date').text().trim();
            const runtime = $(element).find('.title .date .runtime').text().trim();
            const overview = $(element).find('.overview p').text().trim();
            const image = $(element).find('.image img').attr('src');

            const episode = {
                episodeNumber,
                title,
                rating,
                date,
                runtime,
                overview,
                image,
            };
            episodes.push(episode);
        });

        return episodes;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getSeriesSeasons(slug: string) {
    try {
        console.log('GETTING :::', `${movies_site_algorithm}/${slug}/seasons`)
        const { data: html } = await axios.get(`${movies_site_algorithm}/${slug}/seasons`);
        const $ = cheerio.load(html);

        const seasons: any[] = [];

        $('.season_wrapper').each((index, element) => {
            const title = $(element).find('.content h2 a').text().trim();
            const rating = $(element).find('.content .rating_border').text().trim();
            const year = $(element).find('.content h4').text().replace(/\s+/g, ' ').trim().split('•')[0];
            const episodes = $(element).find('.content h4').text().trim().split('•')[1].trim();
            const overview = $(element).find('.content .season_overview p').text().trim();
            const image = $(element).find('img').attr('src');
            const slug = $(element).find('a').attr('href');

            const season = {
                title,
                rating,
                year,
                episodes,
                overview,
                image,
                slug
            };
            seasons.push(season);
        });

        return seasons;
    } catch (e) {
        return Promise.reject(e);
    }
}