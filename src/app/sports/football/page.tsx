import FootballPage from "@/app/sports/football/FootballPage";
import axios from "axios";
import { baseUrl } from "@/constants";

export default async function Page() {
    const res = await axios(`${baseUrl}/api/public/sports/football`);

    return (
        <>
            <FootballPage lineups={res.data.lineupData} />
        </>
    );
}
