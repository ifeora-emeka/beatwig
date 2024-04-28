import { ContainerLg } from "@/components/common/Container";
import FilmHero from "@/app/film/[type]/[slug]/components/FilmHero";
import axios from "axios";
import { baseUrl } from "@/constants";


export default async function Page(props: any) {
    const { params } = props;

    const res = await axios(`${baseUrl}/api/public/film/movies`, {
        method: "POST",
        data: {
            film_slug: params.slug,
            film_type:  params.type
        }
    });

    console.log(res.data)

    return (
        <div className={"flex justify-center gap-default_spacing py-default_spacing_xl"}>
            <ContainerLg>
                <div>
                    <FilmHero data={res.data.result} />
                    <div>More shit</div>
                </div>
            </ContainerLg>
        </div>
    );
}
