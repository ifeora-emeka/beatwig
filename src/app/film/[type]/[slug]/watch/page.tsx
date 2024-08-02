import { ContainerLg } from "@/components/common/Container";
import {
    extractFilmIdFromSlug,
    getFilmDetails,
} from "@/app/api/public/film/film.api";
import FilmRecommendations from "@/app/film/[type]/[slug]/components/FilmRecommendations";
import FilmPlayerRight from "@/app/film/[type]/[slug]/watch/FilmPlayerRight";
import {
    getSeriesEpisodes,
    getSeriesSeasons,
} from "@/app/api/public/film/series/series.api";
import HomeHeader from "@/components/common/HomeHeader";
import { Metadata, ResolvingMetadata } from "next";
import { appData } from "@/constants";
import { cn } from "@/lib/utils";


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
            "Live steam"
        ],
        openGraph: {
            images: [res.poster],
        },
    }
}



export default async function Page(props: any) {
    const { slug, type } = props.params;
    const query = props.searchParams;

    const res = await getFilmDetails({
        film_type: type,
        film_slug: slug,
    });

    let episode = query?.episode || 0;
    let season = query?.season || 1;

    let seasons = type?.includes("tv")
        ? await getSeriesSeasons("tv/" + slug)
        : [];
    let episodes = type?.includes("tv")
        ? await getSeriesEpisodes({
              slug: `tv/${slug}`,
              season: String(season),
          })
        : [];

    return (
        <div className={"text-white flex justify-center py-default_spacing"}>
            <ContainerLg>
                <div className={"flex flex-col gap-default_spacing"}>
                <div className={'hidden md:block'}>
                    <HomeHeader />
                </div>
                    <div
                        className={
                            cn("flex md:flex-row flex-col gap-default_spacing ", {
                                "md:min-h-[500px] md:max-h-[500px] min-h-[650px] max-h-[600px]": type?.includes("tv"),
                                "md:h-[500px] h-[250px]": !type?.includes("tv"),
                            })
                        }
                    >
                        <div
                            className={
                                cn("bg-card overflow-hidden rounded-lg h-full bg-black flex-1", {
                                    "min-h-[250px] md:min-h-[500px]": type?.includes("tv"),
                                    "md:h-[500px] h-[250px]": !type?.includes("tv"),
                                })
                            }
                        >
                            <iframe
                               // src={`https://vidsrc.to/embed/${type}/${extractFilmIdFromSlug(slug)}${type.includes("tv") ? `/${season}/${episode}` : ``}`}
                               src={`https://vidsrc.xyz/embed/${type}/${extractFilmIdFromSlug(slug)}${type.includes("tv") ? `/${season}/${episode}` : ``}`}
                               width="100%"
                               height="100%"
                               allowFullScreen
                                className={cn("rounded-lg", {
                                    "min-h-[250px] md:min-h-[500px]": type?.includes("tv"),
                                })}
                            />
                        </div>
                        {type?.includes("tv") && (
                            <FilmPlayerRight
                                activeSeason={season}
                                activeEpisode={episode}
                                seasonList={seasons || []}
                                episodeList={episodes || []}
                            />
                        )}
                    </div>
                    <FilmRecommendations data={res.recommendations} />
                </div>
            </ContainerLg>
        </div>
    );
}
