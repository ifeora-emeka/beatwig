import React from "react";

import HomePage from "./HomePage";
import { baseUrl } from "@/constants";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
// export const revalidate = 930;

export default async function page() {
    const res = await axios(`${baseUrl}/api/public`);

    revalidatePath("/");

    return (
        <>
            <HomePage
                lineups={res.data.football_lineup}
                movies={res.data.movies}
                series={res.data.series}
            />
        </>
    );
}
