"use client";
import { Badge } from "@/components/ui/badge";
import { BiBookmark, BiPlay } from "react-icons/bi";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function FilmHero({ data }: any) {
    const { slug, type } = useParams();
    return (
        <div
            // style={{ backgroundImage: `url(${data.backdrop})`, backgroundSize: '800px' }}
            className={
                "bg-no-repeat rounded-lg overflow-hidden text-white bg-right bg-card"
            }
        >
            <div
                className={
                    "flex md:flex-row flex-col gap-default_spacing_lg p-default_spacing"
                }
            >
                <div
                    className={
                        "flex gap-default_spacing_lg sm:justify-start justify-center"
                    }
                >
                    <div
                        className={
                            "h-[17rem] w-52 rounded-lg bg-card bg-cover bg-center"
                        }
                        style={{ backgroundImage: `url(${data.poster})` }}
                    />
                </div>
                <div className={"flex gap-default_spacing_lg flex-col"}>
                    <div className={"flex flex-col gap-1"}>
                        <div
                            className={
                                "flex items-center gap-default_spacing text-xs text-muted"
                            }
                        >
                            <div className={"border px-3 py-1 rounded-sm"}>
                                {data?.certification}
                            </div>
                            <div>{data?.release}</div>
                            <div>{data?.runtime}</div>
                        </div>
                        <h1 className={"text-3xl mb-2"}>{data?.title}</h1>
                        <div className={"flex gap-default_spacing flex-wrap"}>
                            {data?.genres?.map((genre: any) => {
                                return (
                                    <Badge
                                        className={"text-muted font-normal"}
                                        key={crypto.randomUUID()}
                                        variant={"outline"}
                                    >
                                        {genre?.name}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>

                    <div className={"flex gap-default_spacing items-center"}>
                        <button
                            className={
                                "rounded-full bg-primary text-white text-xl h-10 w-10 flex items-center justify-center"
                            }
                        >
                            <BiBookmark />
                        </button>
                        <Link
                            href={`/film/${type}/${slug}/watch${type.includes("tv") ? `?season=1&episode=1` : ``}`}
                            className={"flex items-center"}
                            role={"button"}
                        >
                            <BiPlay size={25} />
                            <span>Watch Now</span>
                        </Link>
                    </div>
                    <div className={"flex flex-col"}>
                        <h3>Overview</h3>
                        <p className={"text-sm text-muted"}>{data?.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
