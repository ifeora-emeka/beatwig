import { football_url } from '@/constants';
import axios from 'axios'
import cheerio from 'cheerio'
import {NextRequest} from "next/server";


export async function GET() {
    try {
        const { data: html } = await axios.get(`https://v1.givemeredditstreams.me/soccer/schedule`);
        const $ = cheerio.load(html);

        // Initialize an array to store the lineup data
        const lineupData: any[] = [];

        $('.event__header').each((index, element) => {
            const leagueName = $(element).find('.event__title--name').text().trim();
            const leagueLogo = $(element).find('.tournament-image').attr('src');
            const lineups: any[] = [];

            // Iterate over each event__match within the league
            $(element).nextUntil('.event__header').each((idx, ele) => {
                const lineup: any = {};

                // Extract match details
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

                // Push lineup details to the lineups array
                lineups.push(lineup);
            });

            // Push league details with lineups array to the lineupData array
            lineupData.push({
                leagueName,
                leagueLogo,
                lineups,
            });
        });

        // Return the lineupData
        return Response.json({ lineupData });
    } catch (e) {
        console.log("GET LINEUP ERROR::", e);
        return Response.json({ message: "GET LINEUP ERROR" });
    }
}

// let data = [{
//         "leagueName": "CONCACAF Champions Cup",
//         "leagueLogo": "https://streamsgate.net/images/tournaments/498.png",
//         "lineups": [
//             {
//                 "startTime": "FT",
//                 "homeTeam": {
//                     "name": "Club América",
//                     "logo": "https://streamsgate.net/images/teams/1939.png",
//                     "score": "1"
//                 },
//                 "awayTeam": {
//                     "name": "CF Pachuca",
//                     "logo": "https://streamsgate.net/images/teams/1936.png",
//                     "score": "1"
//                 }
//             },
//             // {...} other lineup under CONCACAF Champions Cup
//         ],
//
//     }]
//

// export async function GET() {
//        try {
//            const { data: html } = await axios.get(football_url + '/schedule/soccer');
//
//            const $ = cheerio.load(html);
//
//            const tournaments = $(".body > .top-tournament").map((index, element) => {
//                const league = {
//                    name: $(element).find('.league-name').text().trim(),
//                    img: $(element).find('.league-name img').attr('src')
//                };
//                const competitions = $(element).find('.competitions > li').map((i, el) => {
//                    const team1 = {
//                        name: $(el).find('.competition-cell-side1 .name').text().trim(),
//                        img: $(el).find('.competition-cell-side1 img').attr('src')
//                    };
//                    const team2 = {
//                        name: $(el).find('.competition-cell-side2 .name').text().trim(),
//                        img: $(el).find('.competition-cell-side2 img').attr('src')
//                    };
//                    const score = $(el).find('.competition-cell-score').text().trim();
//                    const url = $(el).find('.competition a').attr('href');
//                    return { team1, team2, score, url };
//                }).get();
//                return { league, competitions };
//            }).get();
//
//
//            return Response.json({tournaments});
//        } catch (e) {
//            console.log("GET LINEUP ERROR::", e)
//            return Response.json({message: "GET LINEUP ERROR"});
//        }
//
// };



export async function POST(request: NextRequest, route: any) {
    try {
        let data = await request.json();
        const { match_id } = data;
        const url = `https://v1.givemeredditstreams.me/football/event/${match_id}`;
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        // Extracting match details
        // const startTime = $(".duelParticipant__startTime").text().trim();
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

        // Extracting link buttons and their data types
        const links: string[] = [];
        $(".lf__lineUp .embed-link").each((index, element) => {
            const link = $(element).attr("datatype");
            if (link) {
                links.push(link);
            }
        });

        // Construct response object
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
