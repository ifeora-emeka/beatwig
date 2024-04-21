import { football_url } from '@/constants';
import axios from 'axios'
import cheerio from 'cheerio'
import {NextRequest} from "next/server";


export async function GET() {
       try {
           const { data: html } = await axios.get(football_url + '/schedule/soccer');

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
       } catch (e) {
           console.log("GET LINEUP ERROR::", e)
           return Response.json({message: "GET LINEUP ERROR"});
       }
   
};



export async function POST(request: NextRequest, route: any) {
    try {
        let data = await request.json();
        const { match_id } = data;
        const url = `https://v1.givemeredditstreams.me/football/event/${match_id}`;
        console.log('THE URL::', url);
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        // Extracting match details
        const startTime = $(".duelParticipant__startTime").text().trim();
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
            startTime,
            homeTeam: {
                name: homeTeamName,
                logo: homeTeamLogo
            },
            awayTeam: {
                name: awayTeamName,
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
