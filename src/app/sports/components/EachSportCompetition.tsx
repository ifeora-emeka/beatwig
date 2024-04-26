import { SportTournament } from "@/types/sports.types";
import { RadioTower } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { joinMatchChat } from "@/firebase/sport.firebase";
import { useAuthContext } from "@/context/auth.context";

export default function EachSportCompetition({
    data,
}: {
    data: SportTournament;
}) {
    const { user } = useAuthContext();

    const enterMatch = (match_id: string) => {
        if (user) {
            joinMatchChat(user, match_id);
        }
    };

    return (
        <div
            className={"flex flex-col bg-card rounded-xl overflow-hidden"}
            key={crypto.randomUUID()}
        >
            <header
                className={
                    "flex items-center gap-default_spacing p-default_spacing"
                }
            >
                <img src={data.leagueLogo} alt={data.leagueName} width={30} />
                <span className={"text-muted truncate"}>{data.leagueName}</span>
            </header>
            <div className={"flex flex-col"}>
                {data?.lineups?.map((lineup) => {
                    let isLive = lineup.startTime
                        .toLocaleLowerCase()
                        .includes("live");
                    return (
                        <Link
                            href={`/live/sports/football/${lineup.match_id}`}
                            onClick={() => enterMatch(lineup.match_id)}
                            key={crypto.randomUUID()}
                        >
                            <article
                                key={crypto.randomUUID()}
                                className={"border-t hover:bg-hover"}
                            >
                                <div className={"flex items-center"}>
                                    <div
                                        className={
                                            "p-default_spacing min-w-[90px] md:text-md text-sm flex gap-default_spacing"
                                        }
                                    >
                                        {isLive && (
                                            <RadioTower
                                                size={20}
                                                className={cn({
                                                    "text-red-500": isLive,
                                                })}
                                            />
                                        )}
                                        <span
                                            className={cn("truncate", {
                                                "text-red-500": lineup.startTime
                                                    .toLocaleLowerCase()
                                                    .includes("live"),
                                            })}
                                        >
                                            {lineup.startTime}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            "flex flex-col flex-1 max-w-[64%] md:max-w-full"
                                        }
                                    >
                                        <div
                                            className={
                                                "flex items-center p-default_spacing gap-default_spacing"
                                            }
                                        >
                                            <img
                                                src={lineup.homeTeam.logo}
                                                alt={lineup.homeTeam.name}
                                                width={25}
                                            />
                                            <span className={"truncate"}>
                                                {lineup.homeTeam.name}
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                "flex items-center p-default_spacing gap-default_spacing"
                                            }
                                        >
                                            <img
                                                src={lineup.awayTeam.logo}
                                                alt={lineup.awayTeam.name}
                                                width={25}
                                            />
                                            <span className={"truncate"}>
                                                {lineup.awayTeam.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={"flex flex-col items-center"}
                                    >
                                        <span
                                            className={
                                                "p-default_spacing text-center"
                                            }
                                        >
                                            {lineup.homeTeam.score}
                                        </span>
                                        <span
                                            className={
                                                "p-default_spacing text-center"
                                            }
                                        >
                                            {lineup.awayTeam.score}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
