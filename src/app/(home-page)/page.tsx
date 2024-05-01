import React from "react";

import HomePage from "./HomePage";
import { baseUrl } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { shuffleArray } from "@/utils/index.utils";

export const dynamic = "force-dynamic";


export default async function page() {
    const res = await axios(`${baseUrl}/api/public`);

    revalidatePath("/");

    return (
        <>
            <HomePage
                lineups={res.data.football_lineup}
                movies={shuffleArray(res.data.movies)}
                series={shuffleArray(res.data.series)}
            />
        </>
    );
}
