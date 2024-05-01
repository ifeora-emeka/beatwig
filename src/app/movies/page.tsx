import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { BiFilm, BiTv, BiVideo } from "react-icons/bi";
import { Metadata } from "next";
import { appData } from "@/constants";
import { getPopularMovies, getPopularSeries } from "@/app/api/public/film/film.api";
import Link from "next/link";
import EachFilm from "@/app/film/components/EachFilm";
import React from "react";

export const revalidate = 20;

export default async function Page() {
    let movies: any[] = await getPopularMovies();
    let series: any[] = await getPopularSeries();

    return <>
        <div className={'flex justify-center'}>
            <PageContainer>
                <div className={'flex flex-col gap-default_spacing'}>
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
                </div>
            </PageContainer>
        </div>
    </>
}

