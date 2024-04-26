import axios from 'axios'
import cheerio from 'cheerio'
import {NextRequest} from "next/server";
import { getAllFootballSchedule } from "@/app/api/public/sports/sport.api";


export async function GET() {
    try {
       let lineupData = await getAllFootballSchedule();
        return Response.json({ lineupData });
    } catch (e) {
        console.log("GET LINEUP ERROR::", e);
        return Response.json({ lineupData: [] }, { status: 500 });
    }
};


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
