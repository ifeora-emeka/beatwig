import { ContainerLg } from "@/components/common/Container";
import FilmHero from "@/app/film/[type]/[slug]/components/FilmHero";
import axios from "axios";
import { baseUrl } from "@/constants";
import FilmDetailsLeft from "@/app/film/[type]/[slug]/components/FilmDetailsLeft";
import { BiInfoCircle, BiMovie } from "react-icons/bi";
import PageSection from "@/components/common/PageSection";
import FilmRecommendations from "@/app/film/[type]/[slug]/components/FilmRecommendations";

export default async function Page(props: any) {
    const { params } = props;

    const res = await axios(`${baseUrl}/api/public/film/movies`, {
        method: "POST",
        data: {
            film_slug: params.slug,
            film_type: params.type,
        },
    });

    let info = res.data.result.info;

    return (
        <div
            className={
                "flex justify-center gap-default_spacing py-default_spacing_xl px-2"
            }
        >
            <ContainerLg>
                <div className={"flex flex-col gap-default_spacing"}>
                    <FilmHero data={res.data.result} />
                    <div
                        className={
                            "flex gap-default_spacing lg:flex-row flex-col-reverse"
                        }
                    >
                        <FilmDetailsLeft data={res.data.result} />
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
                        data={res.data.result.recommendations}
                    />
                </div>
            </ContainerLg>
        </div>
    );
}
