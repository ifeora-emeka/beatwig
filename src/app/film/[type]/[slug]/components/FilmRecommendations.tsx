"use client";
import PageSection from "@/components/common/PageSection";
import { BiMovie } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FilmRecommendations({ data }: any) {
    const { type } = useParams();
    return (
        <div className={"bg-card p-default_spacing rounded-lg"}>
            <PageSection Icon={BiMovie} heading={"Recommendations"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto pb-default_spacing"
                    }
                >
                    {data &&
                        data.map((film: FilmData) => {
                            return (
                                <Link
                                    key={crypto.randomUUID()}
                                    href={`/film${film.slug}`}
                                >
                                    <EachFilm
                                        data={film}
                                        key={crypto.randomUUID()}
                                    />
                                </Link>
                            );
                        })}
                </div>
            </PageSection>
        </div>
    );
}
