import { ContainerLg } from "@/components/common/Container";
import FilmEpisodes from "@/app/film/[type]/[slug]/components/FilmEpisodes";
import {
    extractFilmIdFromSlug,
    getFilmDetails,
} from "@/app/api/public/film/film.api";
import FilmRecommendations from "@/app/film/[type]/[slug]/components/FilmRecommendations";
import FilmPlayerRight from "@/app/film/[type]/[slug]/watch/FilmPlayerRight";

export default async function Page(props: any) {
    const { slug, type } = props.params;

    const res = await getFilmDetails({
        film_type: type,
        film_slug: slug,
    });

    return (
        <div className={"text-white flex justify-center py-default_spacing_xl"}>
            <ContainerLg>
                <div className={"flex flex-col gap-default_spacing"}>
                    <div className={"flex gap-default_spacing"}>
                        <div
                            className={
                                "bg-card p-default_spacing rounded-lg h-[540px] bg-black flex-1"
                            }
                        >
                            <iframe
                                src={`https://vidsrc.to/embed/movie/${extractFilmIdFromSlug(slug)}`}
                                width="100%"
                                height="100%"
                                allowFullScreen
                                className={"rounded-lg"}
                            />
                        </div>
                        {type?.includes("tv") && (
                            <FilmPlayerRight data={props} />
                        )}
                    </div>
                    <FilmRecommendations data={res.recommendations} />
                </div>
            </ContainerLg>
        </div>
    );
}
