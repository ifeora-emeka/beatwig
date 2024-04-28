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

export default async function Page(props: any) {
    const { slug, type } = props.params;
    const query = props.searchParams;

    const res = await getFilmDetails({
        film_type: type,
        film_slug: slug,
    });

    let episode = query?.episode || 0;
    let season = query?.season || 1;

    let seasons = await getSeriesSeasons("tv/" + slug);
    let episodes = await getSeriesEpisodes({
        slug: `tv/${slug}`,
        season: String(season),
    });

    return (
        <div className={"text-white flex justify-center py-default_spacing_xl"}>
            <ContainerLg>
                <div className={"flex flex-col gap-default_spacing"}>
                    <div
                        className={
                            "flex md:flex-row flex-col gap-default_spacing md:h-[500px] h-[650px]"
                        }
                    >
                        <div
                            className={
                                "bg-card p-default_spacing rounded-lg md:h-full min-h-[229px] bg-black flex-1"
                            }
                        >
                            <iframe
                                src={`https://vidsrc.to/embed/${type}/${extractFilmIdFromSlug(slug)}${type.includes("tv") ? `/${season}/${episode}` : ``}`}
                                width="100%"
                                height="100%"
                                allowFullScreen
                                className={"rounded-lg"}
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
