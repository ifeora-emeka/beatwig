"use client";
import Container from "@/components/common/Container";
import HomeHeader from "@/components/common/nav/HomeHeader";
import { Calendar, RadioTower } from "lucide-react";
import React from "react";
import { SportTournament } from "@/app/types/sports.types";
import { cn } from "@/lib/utils";

export default function HomePage({
    football,
}: {
    football: SportTournament[];
}) {
    console.log('THE RESULT ::', football)
    return (
        <div className="flex justify-center">
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <hr />
                    <div className="flex flex-col gap-default_spacing">
                        <h3 className="text-muted text-lg flex gap-3 px-default_spacing_lg md:px-0">
                            <RadioTower />
                            Live Now
                        </h3>
                        {/* <EachLineupContainer /> */}
                    </div>
                    <hr />
                    <div
                        className="flex flex-col gap-default_spacing"
                        key={crypto.randomUUID()}
                    >
                        <div
                            className={
                                "flex gap-default_spacing items-center justify-center py-default_spacing_lg"
                            }
                        >
                            {["Yesterday", "Today", "Tomorrow"].map(
                                (label, i) => {
                                    return (
                                        <div
                                            key={crypto.randomUUID()}
                                            role={"button"}
                                            aria-label={label}
                                            className={cn(
                                                "py-2 px-4 rounded-full",
                                                {
                                                    "bg-primary": i == 1,
                                                    "bg-hover": i != 1,
                                                },
                                            )}
                                        >
                                            {label}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                        <h3 className="text-muted text-lg gap-3 flex px-default_spacing_lg md:px-0">
                            <Calendar />
                            {`Today's lineup`}
                        </h3>
                        {
                            football && football?.map(data => {
                                return <section className={'flex flex-col bg-card rounded-xl'} key={crypto.randomUUID()}>
                                    <header className={'flex items-center gap-default_spacing p-default_spacing'}>
                                        <img src={data.leagueLogo} alt={data.leagueName} width={30} />
                                        <span className={'text-muted truncate'}>{data.leagueName}</span>
                                    </header>
                                    <div className={'flex flex-col'}>
                                        {
                                            data.lineups.map(lineup => {
                                                let isLive = lineup.startTime.toLocaleLowerCase().includes('live');
                                                return <article key={crypto.randomUUID()} className={'border-t hover:bg-hover'}>
                                                    <div className={"flex items-center"}>
                                                        <div className={"p-default_spacing min-w-[90px] md:text-md text-sm flex gap-default_spacing"}>
                                                            { isLive && <RadioTower size={20} className={cn({
                                                                "text-red-500": isLive
                                                            })} />}
                                                            <span className={cn('truncate', {
                                                            "text-red-500": lineup.startTime.toLocaleLowerCase().includes('live')
                                                        })}>
                                                             {lineup.startTime}
                                                        </span>
                                                        </div>
                                                        <div className={"flex flex-col flex-1 max-w-[64%]"}>
                                                            <div className={"flex items-center p-default_spacing gap-default_spacing"}>
                                                                <img src={lineup.homeTeam.logo}
                                                                     alt={lineup.homeTeam.name} width={25} />
                                                                <span className={'truncate'}>{lineup.homeTeam.name}</span>
                                                            </div>
                                                            <div className={"flex items-center p-default_spacing gap-default_spacing"}>
                                                                <img src={lineup.awayTeam.logo}
                                                                     alt={lineup.awayTeam.name} width={25} />
                                                                <span className={'truncate'}>{lineup.awayTeam.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className={"flex flex-col items-center"}>
                                                        <span className={'p-default_spacing text-center'}>
                                                            {lineup.homeTeam.score}
                                                        </span>
                                                            <span className={'p-default_spacing text-center'}>
                                                            {lineup.awayTeam.score}
                                                        </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            })
                                        }
                                    </div>
                                </section>
                            })
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
}
