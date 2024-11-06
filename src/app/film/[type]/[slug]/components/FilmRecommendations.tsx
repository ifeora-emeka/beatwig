"use client";
import PageSection from "@/components/common/PageSection";
import { BiMovie } from "react-icons/bi";
import EachFilm from "@/app/film/components/EachFilm";
import { FilmData } from "@/types/film.types";
import Link from "next/link";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import { useEffect, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import EachFilmLg from "@/app/film/components/EachFilmLg";

export default function FilmRecommendations({ data }: any) {
    const [show, setShow] = useState(false);
    const saveMovieProgress = async (filmData: Partial<FilmData>) => {
        try {
            console.log("STORING MOVIE");
            const messagesRef = collection(db, dbCollectionName.WATCHED_MOVIE);

            return await addDoc(messagesRef, filmData);
        } catch (error) {
            console.error("Error saving movie progress:", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            // saveMovieProgress({
            //     title: "This is the title"
            // });
        }, 1000);
    }, []);

    useEffect(() => {
        setShow(true);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className={"bg-card p-default_spacing rounded-lg"}>
            <PageSection Icon={BiMovie} heading={"Recommendations"}>
                <div
                    className={
                        "gap-default_spacing pb-default_spacing grid grid-cols-1 md:grid-cols-2"
                    }
                >
                    {data &&
                        data.map((film: FilmData) => {
                            return (
                                <Link
                                    key={crypto.randomUUID()}
                                    href={`/film${film.slug}`}
                                >
                                    <EachFilmLg
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
