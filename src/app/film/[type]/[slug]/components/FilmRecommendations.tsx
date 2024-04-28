'use client'
import PageSection from "@/components/common/PageSection";
import { BiMovie } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";


export default function FilmRecommendations({ data }:any){
    return <div className={'bg-card p-default_spacing rounded-lg'}>
        <PageSection Icon={BiMovie} heading={"Recommendations"}>
            <div className={'flex gap-default_spacing overflow-x-auto pb-default_spacing'}>
                {
                    data && data.map((film:FilmData) => {
                        return <EachFilm data={film} key={crypto.randomUUID()} />
                    })
                }
            </div>
        </PageSection>
    </div>
}

