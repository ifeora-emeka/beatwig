import { ContainerLg } from "@/components/common/Container";
import FilmHero from "@/app/film/[type]/[slug]/components/FilmHero";
import axios from "axios";
import { appData, baseUrl } from "@/constants";
import FilmDetailsLeft from "@/app/film/[type]/[slug]/components/FilmDetailsLeft";
import { BiInfoCircle, BiMovie } from "react-icons/bi";
import PageSection from "@/components/common/PageSection";
import FilmRecommendations from "@/app/film/[type]/[slug]/components/FilmRecommendations";
import HomeHeader from "@/components/common/HomeHeader";
import { getFilmDetails } from "@/app/api/public/film/film.api";
import { Metadata, ResolvingMetadata } from "next";
import { getFilmBookmark } from "@/firebase/film.firebase";
import { cookies, headers } from "next/headers";


export async function generateMetadata(
    { params, searchParams }: any,
    parent: ResolvingMetadata
): Promise<Metadata> {

    let res = await getFilmDetails({
        film_type: params.type,
        film_slug: params.slug
    });

    return {
        title: `Watch ${res.title} on ${appData.name}`,
        description: res.overview || `Watch ${res.title} on ${appData.name}`,
        keywords: [
            ...res.genres.map(genre => genre.name),
            appData.name,
            ...appData.keywords
        ],
        openGraph: {
            images: [res.poster],
        },
    }
}



export default async function Page(props: any) {
    const { params } = props;

    const head = cookies();
    const user_id = head.get('user_id')?.value;

    let bookmark = await getFilmBookmark({
        film_id: params.slug as string,
        user_id: user_id as string
    })

    let res = await getFilmDetails({
        film_type: params.type,
        film_slug: params.slug
    });
    
    let info = res?.info;
    
    return (
        <div
            className={
                "flex justify-center gap-default_spacing py-default_spacing px-2"
            }
        >
            <ContainerLg>
                <div className={'flex flex-col gap-default_spacing'}>
                    <HomeHeader />
                    <div className={"flex flex-col gap-default_spacing"}>
                        <FilmHero data={res} bookmarked={bookmark?.id ? true : false} />
                        <div
                            className={
                                "flex gap-default_spacing lg:flex-row flex-col-reverse"
                            }
                        >
                            <FilmDetailsLeft data={res} />
                            <div
                                className={
                                    "flex-1 p-default_spacing bg-card rounded-lg text-white"
                                }
                            >
                                <PageSection
                                    Icon={BiInfoCircle}
                                    heading={"More info"}
                                >
                                    <div>
                                        <small className={"text-muted"}>
                                            Language
                                        </small>
                                        <p>{info?.language}</p>
                                    </div>
                                    <div>
                                        <small className={"text-muted"}>
                                            Budget
                                        </small>
                                        <p>{info?.budget}</p>
                                    </div>
                                    <div>
                                        <small className={"text-muted"}>
                                            Revenue
                                        </small>
                                        <p>{info?.revenue}</p>
                                    </div>
                                </PageSection>
                            </div>
                        </div>
                        <FilmRecommendations
                            data={res.recommendations}
                        />
                    </div>
                </div>
            </ContainerLg>
        </div>
    );
}
