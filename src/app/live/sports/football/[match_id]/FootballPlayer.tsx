"use client";
import { Share } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import FootballMatchDetails from "@/app/live/sports/football/[match_id]/FootballMatchDetails";
import { FootballDetails } from "@/app/types/sports.types";
import CountdownTimer from "@/components/common/CountdownTimmer";

type Props = {
    data: FootballDetails
};

export default function FootballPlayer({ data }: Props) {
    const { match_id } = useParams();
    return (
        <div className="flex flex-col lg:gap-default_spacing">
            <div className="bg-card lg:p-default_spacing lg:rounded-lg gap-default_spacing flex flex-col text-muted">
                <header className="hidden lg:flex gap-default_spacing items-center justify-between">
                    <div className="flex gap-default_spacing items-center">
                        <div className="relative h-7 w-7">
                            <Image
                                fill
                                alt=""
                                className="absolute"
                                src="https://streamsgate.net/images/tournaments/679.png"
                            />
                        </div>
                        <h1 className="text-sm md:text-md">
                            UEFA Europa League
                        </h1>
                    </div>
                    <button className="text-muted">
                        <Share className="h-4 w-4" />
                    </button>
                </header>
                <div className="md:h-[416px] h-[202px] bg-black lg:rounded-lg">
                    <CountdownTimer />
                    {data.stream_url && (
                        <iframe
                            // @ts-ignore
                            scrolling="no"
                            // @ts-ignore
                            allowtransparencysandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
                            width="100%"
                            height="100%"
                            src={data.stream_url}
                            allowFullScreen
                            allowTransparency
                            className="lg:rounded-lg"
                        />
                    )}
                </div>
            </div>

            <FootballMatchDetails data={data} />
        </div>
    );
}
