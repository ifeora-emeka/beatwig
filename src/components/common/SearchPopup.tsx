"use client";
import Container from "@/components/common/Container";
import { ArrowUpRight, SearchIcon, TvIcon, VideoIcon, X } from "lucide-react";
import { useAppContext } from "@/context/app.context";
import { useState } from "react";
import { useRouter } from "next13-progressbar";
import PageSection from "./PageSection";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function SearchPopup() {
    const router = useRouter();
    const {
        appState: { showSearch },
        setAppContextState,
    } = useAppContext();
    const [keyword, setKeyword] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword) {
            router?.push(`/search?q=${keyword}`);
            setAppContextState({ showSearch: false });
        }
    };

    if (!showSearch) {
        return null;
    }


    return <>
        <div className="bg-[#0000004a] z-[2000] fixed top-0 right-0 bottom-0 left-0 max-h-screen min-h-screen flex justify-center md:p-default_spacing">
            <Container>
                <div className="px-default_spacing_lg py-default_spacing rounded-full flex flex-col gap-default_spacing">
                    <div className="bg-card px-default_spacing_lg py-default_spacing rounded-full flex gap-default_spacing">
                        <SearchIcon className="text-muted" />
                        <input className="flex-1 bg-card outline-none" placeholder="Search for movies and TV shows..." />
                        <button>
                            <X className="text-muted" />
                        </button>
                    </div>
                    <div className="bg-card rounded-xl p-default_spacing">
                        <PageSection Icon={VideoIcon} heading="Movies" rightHeadingComp={
                            <Link href={'/'} className="text-primary flex">
                                Show all <ArrowUpRight className="ml-2" />
                            </Link>
                        }>
                            <div>
                                <EachResultLoading />
                                <EachResult />
                                <EachResult />
                                <EachResult />
                            </div>
                        </PageSection>
                    </div>
                    <div className="bg-card rounded-xl p-default_spacing">
                        <PageSection Icon={TvIcon} heading="Tv series" rightHeadingComp={
                            <Link href={'/'} className="text-primary flex">
                                Show all <ArrowUpRight className="ml-2" />
                            </Link>
                        }>
                            <div>
                                <EachResult />
                                <EachResult />
                                <EachResult />
                                <EachResult />
                            </div>
                        </PageSection>
                    </div>
                </div>
            </Container>
        </div >
    </>
}

const EachResult = () => {
    return <>
        <div className="bg-card p-default_spacing rounded-lg border-t hover:bg-hover flex gap-default_spacing hover:shadow-sm cursor-pointer">
            <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                <div className="bg-[url(https://cdn.pixabay.com/photo/2016/01/22/08/20/film-1155439_640.jpg)] min-h-14 min-w-11 bg-cover bg-center rounded-md" />
                <div className="truncate">
                    <h5>The name of the movie</h5>
                    <small className="text-muted truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam magnam fuga qui quam, harum iure molestias alias obcaecati deleniti facilis eius sunt, recusandae aperiam voluptate doloremque officia assumenda ipsa perferendis!</small>
                </div>
            </div>
            <div className="min-h-10 min-w-10"></div>
        </div>
    </>
}

const EachResultLoading = () => {
    return <>
        <div className="bg-card p-default_spacing rounded-lg border-t flex gap-default_spacing">
            <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                <Skeleton className="min-h-14 min-w-11 bg-cover bg-center rounded-md" />
                <div className="truncate w-full flex flex-col gap-default_spacing justify-center">
                    <h5>
                        <Skeleton className="h-3 w-[40%]" />
                    </h5>
                    <small className="text-muted truncate w-full">
                        <Skeleton className="p-1 w-[70%]" />
                    </small>
                </div>
            </div>
            <div className="min-h-10 min-w-10"></div>
        </div>
    </>
}
