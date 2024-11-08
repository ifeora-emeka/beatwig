'use client';
import PageSection from "@/components/common/PageSection";
import Link from "next/link";
import { ArrowUpRight, Tv } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilmData } from "@/types/film.types";
import { useAppContext } from "@/context/app.context";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


interface Props {
    Icon: any;
    heading: string;
    isLoading?: boolean;
    list: FilmData[];
    placeholderText: string;
}

export default function EachSearchResults({
    heading,
    Icon,
    list,
    isLoading,
    placeholderText
}: Props) {
    const { setAppContextState } = useAppContext();
    const [showMore, setShowMore] = useState(false);
    const limit = 5;
    const id = crypto.randomUUID();

    const smoothScrollToID = () => {
        const element = document.getElementById(`${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    const toggleMore = () => {
        if(showMore) {
            smoothScrollToID();
        }
        setShowMore(!showMore);
    }

    return (
        <div className="bg-card rounded-xl p-default_spacing shadow-md" id={id}>
            <PageSection
                Icon={Icon}
                heading={heading}
            >
                <div>
                    {isLoading &&
                        new Array(4).fill(null).map((_, index) => {
                            return <EachResultLoading key={`result-loading-${index}`} />;
                        })}
                    {!isLoading &&
                        list.map((data, index) => {
                            if(!showMore) {
                                if (index < limit) {
                                    return (
                                        <Link
                                            key={`result--${index}`}
                                            prefetch
                                            href={`/film${data.slug}`}
                                            onClick={() =>
                                                setAppContextState({
                                                    showSearch: false,
                                                })
                                            }
                                        >
                                            <EachResult
                                                title={data.title}
                                                subTitle={data.overview || ""}
                                                imgURL={data.poster || ""}
                                            />
                                        </Link>
                                    );
                                }
                            } else {
                                return (
                                    <Link
                                        key={`result--${index}`}
                                        prefetch
                                        href={`/film${data.slug}`}
                                        onClick={() =>
                                            setAppContextState({
                                                showSearch: false,
                                            })
                                        }
                                    >
                                        <EachResult
                                            title={data.title}
                                            subTitle={data.overview || ""}
                                            imgURL={data.poster || ""}
                                        />
                                    </Link>
                                );
                            }
                        })}
                </div>
                {!isLoading && list.length === 0 && <ResultEmpty text={placeholderText} />}
                {list.length > limit ? (
                    <div className={`text-center`}>
                        <button className={"hover:text-primary"} onClick={toggleMore}>
                            {showMore ? "Show Less": "Show More"}
                        </button>
                    </div>
                ) : null}
            </PageSection>
        </div>
    );
}

export const EachResult = ({
    imgURL,
    subTitle,
    title,
}: {
    title: string;
    subTitle: string;
    imgURL: string;
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <>
            <div className={cn("bg-card p-default_spacing rounded-lg border-t hover:bg-hover flex gap-default_spacing cursor-pointer text-muted hover:text-foreground hover:shadow-md group transition-opacity duration-500 hover:z-50", {
                "opacity-100": show,
                "opacity-0": !show,
            })}>
                <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                    <div
                        className={` min-h-14 min-w-11 bg-cover bg-center rounded-md bg-background`}
                        style={{
                            backgroundImage: `url(${imgURL})`,
                        }}
                    />
                    <div className="truncate">
                        <h5 className={"truncate"}>{title}</h5>
                        <p className="text-muted truncate text-xs">
                            {subTitle}
                        </p>
                    </div>
                </div>
                <div className="min-h-10 min-w-10 flex justify-end opacity-0 group-hover:opacity-100">
                    <ArrowUpRight />
                </div>
            </div>
        </>
    );
};

export const EachResultLoading = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <>
            <div className={cn("opacity-5 bg-card p-default_spacing rounded-lg border-t flex gap-default_spacing transition-all duration-500", {
                "h-auto max-h-60 opacity-100": show,
                "h-0 max-h-0 opacity-0": !show,
            })}>
                <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                    <Skeleton className="min-h-14 min-w-11 bg-cover bg-center rounded-md" />
                    <div className="truncate w-full flex flex-col gap-default_spacing justify-center">
                        <h5>
                            <Skeleton className="h-4 w-[40%]" />
                        </h5>
                        <small className="text-muted truncate w-full">
                            <Skeleton className="h-2 w-[70%]" />
                        </small>
                    </div>
                </div>
                <div className="min-h-10 min-w-10"></div>
            </div>
        </>
    );
};

const ResultEmpty = ({ text }: { text: string }) => {
    return <>
        <div className="flex items-center justify-center min-h-80 w-full flex-col gap-default_spacing">
            <Tv className="h-20 w-20" />
            <h1 className="text-center">{`${text}`}</h1>
        </div>
    </>
}
