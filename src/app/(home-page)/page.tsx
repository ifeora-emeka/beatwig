import React from "react";

import HomePage from "./HomePage";
import { baseUrl } from "@/constants";
import axios from "axios";

export const revalidate = 30;

export default async function page() {
    const res = await axios(`${baseUrl}/api/public/sports/football`);

    return (
        <>
            <HomePage football={res.data.tournaments} />
        </>
    );
}
