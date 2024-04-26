"use client";
import React, { useEffect, useState } from "react";
import { SportTournament } from "@/types/sports.types";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { BiBroadcast, BiFilm, BiTv, BiVideoRecording } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";

interface Props {
    lineups: SportTournament[];
    movies: FilmData[];
    series: FilmData[];
}

export default function HomePage({ lineups, movies, series }: Props) {
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

    console.log("THE HOME PAGE:::", { lineups, movies });

    return (
        <PageContainer>
            <PageSection Icon={BiBroadcast} heading={"Live football"}>
                <h1>How va</h1>
            </PageSection>
            <PageSection Icon={BiFilm} heading={"Popular movies"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto py-default_spacing md:px-0 px-default_spacing"
                    }
                >
                    {movies &&
                        movies.map((movie) => {
                            return (
                                <EachFilm
                                    key={crypto.randomUUID()}
                                    data={movie}
                                />
                            );
                        })}
                </div>
            </PageSection>
            <PageSection Icon={BiTv} heading={"Popular series"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto py-default_spacing md:px-0 px-default_spacing"
                    }
                >
                    {
                        series && series.map(tv => {
                            return <EachFilm key={crypto.randomUUID()} data={tv} />
                        })
                    }
                </div>
            </PageSection>
        </PageContainer>
);
}
