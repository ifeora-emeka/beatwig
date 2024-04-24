import React from "react";

import HomePage from "./HomePage";
import { baseUrl } from "@/constants";
import axios from "axios";

// export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function page() {
    const res = await axios(`${baseUrl}/api/public/sports/football`);

    return (
        <>
            <HomePage lineups={res.data.lineupData} />
        </>
    );
}
