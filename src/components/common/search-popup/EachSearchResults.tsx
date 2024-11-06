import PageSection from "@/components/common/PageSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
}

export default function EachSearchResults({
    heading,
    Icon,
    list,
    isLoading,
}: Props) {
    const { setAppContextState } = useAppContext();
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="bg-card rounded-xl p-default_spacing shadow-md">
            <PageSection
                Icon={Icon}
                heading={heading}
            >
                <div>
                    {isLoading &&
                        new Array(4).fill(null).map((_) => {
                            return <EachResultLoading />;
                        })}
                    {!isLoading &&
                        list.map((data, index) => {
                            if (index < 4) {
                                return (
                                    <Link
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
                {list.length > 5 ? (
                    <div className={`text-center`}>
                        <button className={"hover:text-primary"} onClick={() => setShowMore(true)}>
                            Show More
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
    },[])

    return (
        <>
            <div className={cn("bg-card p-default_spacing rounded-lg border-t hover:bg-hover flex gap-default_spacing cursor-pointer text-muted hover:text-foreground hover:shadow-md group transition-opacity duration-500", {
                "opacity-100": show,
                "opacity-0": !show,
            })}>
                <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                    <div
                        className={` min-h-14 min-w-11 bg-cover bg-center rounded-md`}
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
    },[])

    return (
        <>
            <div className={cn("opacity-30 bg-card p-default_spacing rounded-lg border-t flex gap-default_spacing transition-all duration-500", {
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
                            <Skeleton className="p-2 w-[70%]" />
                        </small>
                    </div>
                </div>
                <div className="min-h-10 min-w-10"></div>
            </div>
        </>
    );
};
