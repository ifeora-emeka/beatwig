import HomeHeader from "@/components/common/HomeHeader";
import PageSection from "@/components/common/PageSection";
import { TvIcon, VideoIcon } from "lucide-react";
import { scrapeSearch } from "@/app/api/public/film/film.api";
import Link from "next/link";
import EachFilm from "@/app/film/components/EachFilm";
import React from "react";
import Container from "@/components/common/Container";

export default async function Page(props: any) {
    console.log("THE PROPS::", props);
    const { searchParams } = props;

    let series = await scrapeSearch({
        type: "tv",
        keyword: searchParams.q,
    });
    let movies = await scrapeSearch({
        type: "movie",
        keyword: searchParams.q,
    });

    // console.log('THE SERIES:;', series)

    return (
        <>
            <div>
                <div className={"flex justify-center py-default_spacing_lg"}>
                    <Container>
                        <div
                            className={"flex flex-col gap-default_spacing_xl "}
                        >
                            <HomeHeader />

                            <h1 className={"text-muted text-xl"}>
                                Result for: <strong>"{searchParams.q}"</strong>
                            </h1>

                            <PageSection Icon={VideoIcon} heading={"Movies"}>
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

                            <PageSection Icon={TvIcon} heading={"TV series"}>
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
                    </Container>
                </div>
            </div>
        </>
    );
}
