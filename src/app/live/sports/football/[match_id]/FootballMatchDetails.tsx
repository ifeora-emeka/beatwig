import Image from "next/image";
import React from "react";
import { FootballDetails } from "@/app/types/sports.types";

type Props = {
    data: FootballDetails;
};

export default function FootballMatchDetails({ data }: Props) {
    return (
        <div className="hidden bg-card lg:py-default_spacing px-default_spacing md:rounded-lg text-muted md:visible items-center md:flex justify-between">
            <div
                className={
                    "flex items-center gap-default_spacing min-w-[40%] max-w-[40%]"
                }
            >
                <img src={data.homeTeam.logo} width={40} />
                <h6 className={"truncate"}>{data.homeTeam.name}</h6>
            </div>

            <div className={"flex flex-col gap-2 text-xl"}>
                <span>{data.score}</span>
            </div>

            <div
                className={
                    "flex justify-end items-center gap-default_spacing min-w-[40%] max-w-[40%]"
                }
            >
                <h6 className={"truncate"}>{data.awayTeam.name}</h6>
                <img src={data.awayTeam.logo} width={40} />
            </div>
        </div>
    );
}
