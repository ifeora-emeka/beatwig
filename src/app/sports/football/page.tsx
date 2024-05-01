import axios from "axios";
import { appData, baseUrl } from "@/constants";
import PageSection from "@/components/common/PageSection";
import { BiBroadcast, BiCalendar } from "react-icons/bi";
import EachSportCompetition from "@/app/sports/components/EachSportCompetition";
import PageContainer from "@/components/common/PageContainer";
import React from "react";
import { SportTournament } from "@/types/sports.types";
import { Metadata } from "next";

export const revalidate = 20;

export const metadata: Metadata = {
    title: `Watch Football Live Stream Online - Stream Matches from Any League | ${appData.name}`,
    description: `Stream live football matches from any league worldwide on ${appData.name}. Enjoy HD quality streams of Premier League, La Liga, Serie A, Bundesliga, and more. Never miss a game with our streaming service!`,
};

export default async function Page() {
    const res = await axios(`${baseUrl}/api/public/sports/football`);
    let lineups = res.data.lineupData;

    let liveTournaments:SportTournament[] = [];

    let allLives: SportTournament[] = [];

    lineups?.forEach((lineup:SportTournament) => {
        let lives = lineup.lineups.filter(
            (x) => x.startTime === "LIVE",
        );
        if (lives.length > 0) {
            allLives.push(lineup);
        }
    });

    return (
        <>
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
                        lineups?.map((data:SportTournament) => {
                            return (
                                <EachSportCompetition
                                    data={data}
                                    key={crypto.randomUUID()}
                                />
                            );
                        })}
                </PageSection>
            </PageContainer>
        </>
    );
}
