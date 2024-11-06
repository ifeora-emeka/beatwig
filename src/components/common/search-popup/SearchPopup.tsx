'use client'
import Container from "@/components/common/Container";
import { TvIcon, VideoIcon } from "lucide-react";
import SearchInput from "./SearchInput";
import { useAppContext } from "@/context/app.context";
import EachSearchResults from "@/components/common/search-popup/EachSearchResults";
import SearchHistory from "@/components/common/search-popup/SearchHistory";
import SearchContinueWatching from "@/components/common/search-popup/SearchContinueWatching";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function SearchPopup() {
    const {
        appState: { showSearch },
        setAppContextState,
    } = useAppContext();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (showSearch) {
            setShow(true);
        } else {
            setTimeout(() => {
                setShow(false);
            }, 400);
        }
    }, [showSearch]);

    if (!show && !showSearch) {
        return null;
    }

    return (
        <div
            className={cn(
                "bg-[#000000b8] z-[800] fixed top-0 right-0 bottom-0 left-0 max-h-screen min-h-screen flex justify-center overflow-y-auto",
                showSearch ? "animate-in fade-in duration-500" : "animate-out fade-out duration-500"
            )}
        >
            <Container>
                <div className={cn("p-default_spacing rounded-full flex flex-col gap-default_spacing")}>
                    <SearchInput onClose={() => setAppContextState({ showSearch: false })} />
                    <div className={cn("w-full flex flex-col gap-default_spacing transition-all duration-700")}>
                        <EachSearchResults Icon={VideoIcon} heading={"Movies"} />
                        <EachSearchResults Icon={TvIcon} heading={"Tv Shows"} />
                    </div>
                    <SearchHistory />
                    <SearchContinueWatching />
                </div>
            </Container>
        </div>
    );
}
