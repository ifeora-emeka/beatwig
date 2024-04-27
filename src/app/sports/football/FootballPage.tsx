"use client";
import { Calendar, RadioTower } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SportTournament } from "@/types/sports.types";
import EachSportCompetition from "@/app/sports/components/EachSportCompetition";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { BiBroadcast, BiCalendar } from "react-icons/bi";

export default function FootballPage({
    lineups,
}: {
    lineups: SportTournament[];
}) {
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

    return (
        <PageContainer>
            <PageSection Icon={BiBroadcast} heading={"Live Now"}>
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

            <PageSection Icon={BiCalendar} heading={`Today's lineup`}>
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
