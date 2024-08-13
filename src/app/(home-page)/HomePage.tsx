"use client";
import React, { useEffect, useState } from "react";
import { SportTournament } from "@/types/sports.types";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { BiBroadcast, BiCalendar, BiFilm, BiTv } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";
import EachSportCompetition from "@/app/sports/components/EachSportCompetition";
import Link from "next/link";

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
                if (lives?.length > 0) {
                    allLives.push(lineup);
                }
            });
        setLiveTournaments(allLives);
    }, [lineups]);

    return (
        <PageContainer withTopLinks>
            <PageSection Icon={BiFilm} heading={"Popular movie"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto pb-default_spacing md:px-0 px-default_spacing"
                    }
                >
                    {movies &&
                        movies.map((movie) => {
                            return (
                                <Link
                                    href={`/film${movie.slug}`}
                                    key={crypto.randomUUID()}
                                >
                                    <EachFilm data={movie} />
                                </Link>
                            );
                        })}
                </div>
            </PageSection>
            <PageSection Icon={BiTv} heading={"Popular series"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto pb-default_spacing md:px-0 px-default_spacing"
                    }
                >
                    {series &&
                        series.map((tv) => {
                            return (
                                <Link
                                    href={`/film${tv?.slug}`}
                                    key={crypto.randomUUID()}
                                >
                                    <EachFilm data={tv} />
                                </Link>
                            );
                        })}
                </div>
            </PageSection>
            <PageSection Icon={BiBroadcast} heading={"Now playing!"}>
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
