"use client";
import PageSection from "@/components/common/PageSection";
import { BiMovie } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";
import Link from "next/link";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import { useEffect } from "react";
import { addDoc, collection } from "@firebase/firestore";

export default function FilmRecommendations({ data }: any) {

    const saveMovieProgress = async (filmData: Partial<FilmData>) => {
        try {
            console.log('STORING MOVIE')
            const messagesRef = collection(db, dbCollectionName.WATCHED_MOVIE);

            return await addDoc(messagesRef, filmData);
        } catch (error) {
            console.error('Error saving movie progress:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            // saveMovieProgress({
            //     title: "This is the title"
            // });
        }, 1000);

    }, []);


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
