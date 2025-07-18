import { ContainerLg } from "@/components/common/Container";
import React from "react";
import FootballComments from "./FootballComments";
import FootballPlayer from "./FootballPlayer";
import { baseUrl } from "@/constants";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";
import { FootballDetails } from "@/types/sports.types";

export const revalidate = 30;

export async function generateMetadata(
    { params, searchParams }: any,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const res = await axios(`${baseUrl}/api/public/sports/football`, {
        method: "POST",
        data: {
            match_id: params.match_id,
        },
    });

    let details: FootballDetails = res.data.matchDetails;

    let title =
        "LIVE: " +
        details?.homeTeam.name +
        " VS " +
        details?.awayTeam.name +
        " on BeatWig";

    return {
        title: title,
        description: `Watch ${details?.homeTeam?.logo} VS ${details?.awayTeam?.logo} LIVE on the BeatWig app.`,
        openGraph: {
            images: [details?.awayTeam?.logo, details?.homeTeam?.logo],
        },
        keywords: [
            details?.homeTeam?.name,
            details?.awayTeam?.name,
            details?.league_name,
            "live football",
            "live sports",
            "live stream",
            "free",
        ],
    };
}

export default async function page(props: any) {
    const res = await axios(`${baseUrl}/api/public/sports/football`, {
        method: "POST",
        data: {
            match_id: props.params.match_id,
        },
    });

    let details: FootballDetails = res.data.matchDetails;

    return (
        <div className="flex justify-center lg:py-default_spacing min-h-[100vh] max-h-[100vh]">
            <ContainerLg>
                <div className="flex lg:gap-default_spacing lg:flex-row flex-col">
                    <div className="flex-1 flex flex-col gap-default_spacing">
                        <FootballPlayer data={details} />
                    </div>
                    <div className="lg:w-[400px] lg:h-[calc(100vh-12px-12px)] h-[calc(100vh-210px-50px)] flex flex-col gap-default_spacing">
                        <FootballComments />
                    </div>
                </div>
            </ContainerLg>
        </div>
    );
}
