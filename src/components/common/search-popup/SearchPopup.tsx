"use client";
import Container from "@/components/common/Container";
import { TvIcon, VideoIcon } from "lucide-react";
import SearchInput from "./SearchInput";
import { useAppContext } from "@/context/app.context";
import EachSearchResults from "@/components/common/search-popup/EachSearchResults";
import SearchHistory from "@/components/common/search-popup/SearchHistory";
import SearchContinueWatching from "@/components/common/search-popup/SearchContinueWatching";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchPopup() {
    const {
        appState: { showSearch },
        setAppContextState,
    } = useAppContext();
    const [keyword, setKeyword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        movies: [],
        series: [],
    });

    useEffect(() => {
        if (showSearch) {
            setShow(true);
        } else {
            setTimeout(() => {
                setShow(false);
            }, 400);
        }
    }, [showSearch]);

    const searchMovies = async () => {
        try {
            const element = document.getElementById("search-input");
            element?.scrollIntoView({ behavior: "smooth" });

            setLoading(true);
            setSearchData({
                movies: [],
                series: [],
            });
            let res = await fetch(
                process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/film",
                {
                    method: "POST",
                    body: JSON.stringify({ keyword }),
                },
            );
            let data = await res.json();

            setLoading(false);
            setSearchData({
                movies: data.movies,
                series: data.series,
            });
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setAppContextState({ showSearch: false })
        setTimeout(() => {
            setSearchData({
                movies: [],
                series: [],
            })
        }, 500)
    }

    useEffect(() => {
        if (keyword && keyword?.length > 2) {
            searchMovies();
        }
    }, [keyword]);

    if (!show && !showSearch) {
        return null;
    }

    return (
        <>
            <div
                className={cn(
                    "bg-[#000000b8] z-[800] fixed top-0 right-0 bottom-0 left-0 max-h-screen min-h-screen flex justify-center overflow-y-auto min-w-screen",
                    showSearch
                        ? "animate-in fade-in duration-500"
                        : "animate-out fade-out duration-500",
                )}
            >
                <div id={"search-input"} />
                <Container>
                    <div
                        className={cn(
                            "p-default_spacing rounded-full flex flex-col gap-default_spacing",
                        )}
                    >
                        <SearchInput
                            value={keyword}
                            onChange={(e) => setKeyword(e)}
                            onClose={handleClose}
                        />
                        {keyword && (
                            <div
                                className={cn(
                                    "w-full flex flex-col gap-default_spacing transition-all duration-700",
                                )}
                            >
                                <EachSearchResults
                                    isLoading={loading}
                                    list={searchData.movies}
                                    Icon={VideoIcon}
                                    heading={"Movies"}
                                />
                                <EachSearchResults
                                    isLoading={loading}
                                    list={searchData.series}
                                    Icon={TvIcon}
                                    heading={"Tv Shows"}
                                />
                            </div>
                        )}
                        <SearchHistory
                            setKeyword={(text) => setKeyword(text)}
                        />
                        {process.env.NODE_ENV !== 'production' && <SearchContinueWatching />}
                    </div>
                </Container>
            </div>
        </>
    );
}
