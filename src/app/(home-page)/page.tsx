import React from "react";

import HomePage from "./HomePage";
import { appData, baseUrl } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { shuffleArray } from "@/utils/index.utils";
import { Metadata } from "next";

// export const dynamic = "force-dynamic";
export const revalidate = 10;

export const metadata: Metadata = {
    title: `Stream Movies, TV Series & Live Football | ${appData.name}`,
    description: `Watch unlimited movies, binge-worthy TV series, and live football matches on ${appData.name}. 
    Enjoy HD quality streams, no ads, and instant access to your favorite content.`,
    keywords: [
        ...appData.keywords,
        appData.name,
    ]
};

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
