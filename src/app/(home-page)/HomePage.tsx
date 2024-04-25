"use client";
import Container from "@/components/common/Container";
import HomeHeader from "@/components/common/nav/HomeHeader";
import { Calendar, RadioTower } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SportTournament } from "@/app/types/sports.types";
import { cn } from "@/lib/utils";
import EachSportCompetition from "@/app/(home-page)/EachSportCompetition";

export default function HomePage({ lineups }: { lineups: SportTournament[] }) {
    const [liveTournaments, setLiveTournaments] = useState<SportTournament[]>(
        [],
    );

    useEffect(() => {
        let allLives: SportTournament[] = [];
        lineups &&
            lineups?.forEach((lineup) => {
                let lives = lineup.lineups.filter(
                    (x) => x.startTime === "LIVE"
                );
                if (lives.length > 0) {
                    allLives.push(lineup);
                }
            });
        setLiveTournaments(allLives);
    }, [lineups]);

    return (
        <div className="flex justify-center">
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <hr />
                    <main
                        className="flex flex-col gap-default_spacing"
                    >
                        {/*<div*/}
                        {/*    className={*/}
                        {/*        "flex gap-default_spacing items-center justify-center py-default_spacing_lg"*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {["Yesterday", "Today", "Tomorrow"].map(*/}
                        {/*        (label, i) => {*/}
                        {/*            return (*/}
                        {/*                <div*/}
                        {/*                    key={crypto.randomUUID()}*/}
                        {/*                    role={"button"}*/}
                        {/*                    aria-label={label}*/}
                        {/*                    className={cn(*/}
                        {/*                        "py-2 px-4 rounded-full",*/}
                        {/*                        {*/}
                        {/*                            "bg-primary text-white": i == 1,*/}
                        {/*                            "bg-hover": i != 1,*/}
                        {/*                        },*/}
                        {/*                    )}*/}
                        {/*                >*/}
                        {/*                    {label}*/}
                        {/*                </div>*/}
                        {/*            );*/}
                        {/*        },*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className="flex flex-col gap-default_spacing">
                            <h3 className="text-muted md:text-lg flex gap-3 px-default_spacing_lg md:px-0">
                                <RadioTower />
                                Live Now
                            </h3>
                            {
                                liveTournaments.length > 0 ? liveTournaments?.map((data) => {
                                return (
                                    <EachSportCompetition
                                        data={data}
                                        key={crypto.randomUUID()}
                                    />
                                );
                            }):
                                    <div className={'bg-card rounded-lg text-muted p-default_spacing text-center'}>
                                        <span>No Live matches at the moment</span>
                                    </div>
                            }
                        </div>
                        <hr />
                        <h3 className="text-muted md:text-lg gap-3 flex px-default_spacing_lg md:px-0">
                            <Calendar />
                            {`Today's lineup`}
                        </h3>
                        {lineups &&
                            lineups?.map((data) => {
                                return (
                                    <EachSportCompetition
                                        data={data}
                                        key={crypto.randomUUID()}
                                    />
                                );
                            })}
                    </main>
                </div>
            </Container>
        </div>
    );
}
