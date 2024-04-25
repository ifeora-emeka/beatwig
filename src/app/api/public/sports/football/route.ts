import { sports_site_url } from '@/constants';
import axios from 'axios'
import cheerio from 'cheerio'
import {NextRequest} from "next/server";


export async function GET() {
    try {
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

        return Response.json({ lineupData });
    } catch (e) {
        console.log("GET LINEUP ERROR::", e);
        return Response.json({ lineupData: [] });
    }
}




export async function POST(request: NextRequest, route: any) {
    try {
        let data = await request.json();
        const { match_id } = data;
        const url = `https://v1.givemeredditstreams.me/football/event/${match_id}`;
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        const startTimeFull = $(".duelParticipant__startTime").text().trim();
        const [date, time] = startTimeFull.split(" ");
        const homeTeamName = $(".duelParticipant__home .participant__participantName").text().trim();
        const homeTeamLogo = $(".duelParticipant__home .participant__image").attr("src");
        const awayTeamName = $(".duelParticipant__away .participant__participantName").text().trim();
        const awayTeamLogo = $(".duelParticipant__away .participant__image").attr("src");
        const score = $(".detailScore__wrapper").text().trim();
        const status = $(".detailScore__status .fixedHeaderDuel__detailStatus").text().trim();
        const leagueName = $(".tournamentHeader__country a").text().trim();
        const streamUrl = $(".lf__lineUp .section iframe").attr("src");

        const links: string[] = [];
        $(".lf__lineUp .embed-link").each((index, element) => {
            const link = $(element).attr("datatype");
            if (link) {
                links.push(link);
            }
        });

        const matchDetails = {
            startTime: { date, time },
            homeTeam: {
                name: homeTeamName.split("\n").find(Boolean),
                logo: homeTeamLogo
            },
            awayTeam: {
                name: awayTeamName.split("\n").find(Boolean),
                logo: awayTeamLogo
            },
            score,
            status,
            stream_url: streamUrl || null,
            league_name: leagueName,
            links // Add links to the response
        };

        return Response.json({ matchDetails });
    } catch (e) {
        console.log('MATCH DETAILS ERROR::', e);
        return Response.json({ message: "Error occurred while fetching match details" });
    }
}
