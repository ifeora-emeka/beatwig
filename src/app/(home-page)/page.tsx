import React from "react";

import HomePage from "./HomePage";
import { appData, baseUrl } from "@/constants";
import { shuffleArray } from "@/utils/index.utils";
import { Metadata } from "next";
import HomePageNew from "@/app/(home-page)/HomePageNew";

// export const dynamic = "force-dynamic";
export const revalidate = 10;

export const metadata: Metadata = {
    title: `Stream Movies, TV Series & Live Football | ${appData.name}`,
    description: `Watch unlimited movies, binge-worthy TV series, and live football matches on ${appData.name}. 
    Enjoy HD quality streams, no ads, and instant access to your favorite content.`,
    keywords: [...appData.keywords, appData.name],
};

export default async function page() {
    // const req = await fetch(`${baseUrl}/api/public`);
    // const data = await req.json();
    // const res = { data }

    // // revalidatePath("/");

    // if(process.env.NODE_ENV === 'production') {
    //     return (
    //         <>
    //             <HomePage
    //                 lineups={res.data.football_lineup}
    //                 movies={shuffleArray(res.data.movies)}
    //                 series={shuffleArray(res.data.series)}
    //             />
    //         </>
    //     );
    // }else {
    // }
    return <HomePageNew />;
}
