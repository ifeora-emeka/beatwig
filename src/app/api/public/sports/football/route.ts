import { football_url } from '@/constants';
import axios from 'axios'
import cheerio from 'cheerio'


export async function GET() {

        const { data: html } = await axios.get(football_url);

        const $ = cheerio.load(html);

        const tournaments = $(".body > .top-tournament").map((index, element) => {
            const league = {
                name: $(element).find('.league-name').text().trim(),
                img: $(element).find('.league-name img').attr('src')
            };
            const competitions = $(element).find('.competitions > li').map((i, el) => {
                const team1 = {
                    name: $(el).find('.competition-cell-side1 .name').text().trim(),
                    img: $(el).find('.competition-cell-side1 img').attr('src')
                };
                const team2 = {
                    name: $(el).find('.competition-cell-side2 .name').text().trim(),
                    img: $(el).find('.competition-cell-side2 img').attr('src')
                };
                const score = $(el).find('.competition-cell-score').text().trim();
                const url = $(el).find('.competition a').attr('href');
                return { team1, team2, score, url };
            }).get();
            return { league, competitions };
        }).get();

        return Response.json({tournaments});
   
};

