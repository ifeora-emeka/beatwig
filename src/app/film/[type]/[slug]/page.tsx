import { ContainerLg } from "@/components/common/Container";
import FilmHero from "@/app/film/[type]/[slug]/components/FilmHero";

export default function Page() {
    return (
        <div className={"flex justify-center gap-default_spacing"}>
            <ContainerLg>
                <div>
                    <FilmHero />
                    <div>More shit</div>
                </div>
            </ContainerLg>
        </div>
    );
}
