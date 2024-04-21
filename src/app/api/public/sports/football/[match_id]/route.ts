import {NextRequest} from "next/server";
import axios from "axios";
import {football_details_url, football_url} from "@/constants";
import cheerio from "cheerio";


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
            status
        };

        return Response.json({ matchDetails });
    } catch (e) {
        console.log('MATCH DETAILS ERROR::', e);
        return Response.json({ message: "Error occurred while fetching match details" });
    }
}
