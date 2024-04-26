"use client";
import Container from "@/components/common/Container";
import HomeHeader from "@/components/common/HomeHeader";
import { Calendar, RadioTower } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SportTournament } from "@/types/sports.types";
import EachSportCompetition from "@/app/sports/components/EachSportCompetition";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";

export default function HomePage({ lineups }: { lineups: SportTournament[] }) {
    const [liveTournaments, setLiveTournaments] = useState<SportTournament[]>(
        [],
    );

    useEffect(() => {
        let allLives: SportTournament[] = [];
        lineups &&
            lineups?.forEach((lineup) => {
                let lives = lineup.lineups.filter(
                    (x) => x.startTime === "LIVE",
                );
                if (lives.length > 0) {
                    allLives.push(lineup);
                }
            });
        setLiveTournaments(allLives);
    }, [lineups]);

    let topLinks: {
        label: string;
        link: string;
    }[] = [
        {
            label: "All",
            link: "/",
        },
        {
            label: "Football",
            link: "/",
        },
        {
            label: "Movies",
            link: "/",
        },
        {
            label: "TV Series",
            link: "/",
        },
        {
            label: "Software",
            link: "/",
        },
    ];

    return (
        <PageContainer>
            <div className="flex flex-col gap-default_spacing_lg">
                <div
                    className={
                        "flex gap-default_spacing items-center overflow-x-auto py-default_spacing"
                    }
                >
                    {topLinks.map((link) => {
                        return (
                            <button
                                className={
                                    "bg-primary text-white rounded-lg py-1 px-5"
                                }
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </div>
                <PageSection Icon={RadioTower} heading={"Live Now"}>
                    {liveTournaments?.length > 0 ? (
                        liveTournaments?.map((data) => {
                            return (
                                <EachSportCompetition
                                    data={data}
                                    key={crypto.randomUUID()}
                                />
                            );
                        })
                    ) : (
                        <div
                            className={
                                "bg-card rounded-lg text-muted p-default_spacing text-center py-default_spacing_lg"
                            }
                        >
                            <span>No Live matches at the moment</span>
                        </div>
                    )}
                </PageSection>
            </div>

            <PageSection Icon={Calendar} heading={`Today's lineup`}>
            {lineups &&
                lineups?.map((data) => {
                    return (
                        <EachSportCompetition
                            data={data}
                            key={crypto.randomUUID()}
                        />
                    );
                })}
            </PageSection>

        </PageContainer>
    );
}
