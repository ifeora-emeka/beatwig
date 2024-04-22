"use client";
import { Share } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FootballMatchDetails from "@/app/live/sports/football/[match_id]/FootballMatchDetails";
import { FootballDetails } from "@/app/types/sports.types";
import CountdownTimer from "@/components/common/CountdownTimmer";
import BrandLogo from "@/components/common/BrandLogo";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    data: FootballDetails;
};

export default function FootballPlayer({ data }: Props) {
    const { match_id } = useParams();
    const [activeLink, setActiveLink] = useState(data?.stream_url || "");

    useEffect(() => {
        if (data.stream_url) {
            setActiveLink(data?.stream_url);
        }
    }, []);

    console.log("PLAYER DATA::", data);

    let title =
        "Watch " +
        data?.league_name +
        data?.homeTeam.name +
        " vs " +
        data?.awayTeam.name +
        " live (FREE)";

    if (!data) {
        return <p>Please reload the page</p>;
    }

    return (
        <>
            <div className="flex flex-col lg:gap-default_spacing">
                <div className="bg-card lg:p-default_spacing lg:rounded-lg gap-default_spacing flex flex-col text-muted">
                    <header className="hidden lg:flex gap-default_spacing items-center justify-between">
                        <Link
                            href={"/"}
                            className="flex gap-default_spacing items-center"
                        >
                            <BrandLogo />
                            <span className="text-sm md:text-md">
                                {data.league_name || "BeatWig"}
                            </span>
                            <h1 className={"text-[0px]"}>{title}</h1>
                        </Link>
                        <span className={"text-red-600"}>{data.status}</span>
                        <button className="text-muted">
                            <Share className="h-4 w-4" />
                        </button>
                    </header>
                    <div className="md:h-[416px] h-[202px] bg-black lg:rounded-lg flex justify-center items-center">
                        <CountdownTimer
                            matchStartTime={data.startTime}
                            done={() => console.log("Timer is done")}
                            overdue={() => console.log("TIME is overdue")}
                        />
                        {activeLink && (
                            <iframe
                                // @ts-ignore
                                scrolling="no"
                                // @ts-ignore
                                // allowtransparencysandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
                                width="100%"
                                height="100%"
                                src={activeLink}
                                allowFullScreen
                                allowTransparency
                                className="lg:rounded-lg"
                            />
                        )}
                    </div>
                    <div className={"flex gap-default_spacing items-center"}>
                        {data.links.map((link, i) => {
                            return (
                                <button
                                    key={`server-${i}`}
                                    className={cn("py-1 px-4 rounded-lg", {
                                        "bg-primary text-white":
                                            activeLink == link,
                                    })}
                                    onClick={() => setActiveLink(link)}
                                >
                                    Server {i + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <FootballMatchDetails data={data} />
            </div>
        </>
    );
}
