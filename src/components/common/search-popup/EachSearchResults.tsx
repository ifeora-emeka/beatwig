import PageSection from "@/components/common/PageSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilmData } from "@/types/film.types";
import { useAppContext } from "@/context/app.context";
import { useSearchParams } from "next/navigation";

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
    const params = useSearchParams();

    return (
        <div className="bg-card rounded-xl p-default_spacing shadow-md">
            <PageSection
                Icon={Icon}
                heading={heading}
                rightHeadingComp={
                    <Link
                        target={"_blank"}
                        href={`/search/?q=${params.get("q")}`}
                        className="text-primary flex"
                    >
                        Show all <ArrowUpRight className="ml-2" />
                    </Link>
                }
            >
                <div>
                    {isLoading &&
                        new Array(4).fill(null).map((_, index) => {
                            return <EachResultLoading />;
                        })}
                    {!isLoading &&
                        list.map((data, index) => {
                            if (index < 5) {
                                return (
                                    <Link
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
                        <button className={"hover:text-primary"}>
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
    return (
        <>
            <div className="bg-card p-default_spacing rounded-lg border-t hover:bg-hover flex gap-default_spacing hover:shadow-sm cursor-pointer">
                <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                    <div
                        className={` min-h-14 min-w-11 bg-cover bg-center rounded-md`}
                        style={{
                            backgroundImage: `url(${imgURL})`,
                        }}
                    />
                    <div className="truncate">
                        <h5 className={"truncate"}>{title}</h5>
                        <small className="text-muted truncate">
                            {subTitle}
                        </small>
                    </div>
                </div>
                <div className="min-h-10 min-w-10"></div>
            </div>
        </>
    );
};

export const EachResultLoading = () => {
    return (
        <>
            <div className="opacity-30 bg-card p-default_spacing rounded-lg border-t flex gap-default_spacing">
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
    );
};
