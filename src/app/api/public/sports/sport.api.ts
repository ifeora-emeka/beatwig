import axios from "axios";
import { sports_site_url } from "@/constants";
import cheerio from "cheerio";


export const getAllFootballSchedule = async () => {
    const { data: html } = await axios.get(`${sports_site_url}/soccer/schedule`);
    const $ = cheerio.load(html);

    const lineupData: any[] = [];

    $('.event__header').each((index, element) => {
        const leagueName = $(element).find('.event__title--name').text().trim();
        const leagueLogo = $(element).find('.tournament-image').attr('src');
        const lineups: any[] = [];

        $(element).nextUntil('.event__header').each((idx, ele) => {
            const lineup: any = {};

            lineup.match_id = $(ele).find('a > div').attr('id');
            lineup.startTime = $(ele).find('.event__stage--block').text().trim();
            lineup.homeTeam = {
                name: $(ele).find('.event__participant--home').text().trim(),
                logo: $(ele).find('.event__logo--home').attr('src'),
                score: $(ele).find('.event__score--home').text().trim(),
            };
            lineup.awayTeam = {
                name: $(ele).find('.event__participant--away').text().trim(),
                logo: $(ele).find('.event__logo--away').attr('src'),
                score: $(ele).find('.event__score--away').text().trim(),
            };

            lineups.push(lineup);
        });

        lineupData.push({
            leagueName,
            leagueLogo,
            lineups,
        });
    });

    return lineupData
}

