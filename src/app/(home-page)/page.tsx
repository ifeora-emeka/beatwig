import React from "react";

import HomePage from "./HomePage";
import { baseUrl } from "@/constants";

export const revalidate = 30;

export default async function page() {
    const res = await fetch(`${baseUrl}/api/public/sports/football`);
    const data = await res.json();

    return (
        <>
            <HomePage football={data.tournaments} />
        </>
    );
}
