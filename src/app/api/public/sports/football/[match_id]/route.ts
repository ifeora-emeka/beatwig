import {NextRequest} from "next/server";
import axios from "axios";
import {football_url} from "@/constants";
import cheerio from "cheerio";


export async function POST(request: NextRequest, route:any) {
    try {
        // let match_id = route.params.match_id
        // const { data: html } = await axios.get(football_url + `/soccer/al-nassr-vs-al-fayha/${match_id}`);
        // const $ = cheerio.load(html);



        return Response.json({message: "How va" });
    } catch (e) {
        console.log('MATCH DETAILS ERROR::', e)
        return Response.json({message: "Error don appin ooh" });
    }

}