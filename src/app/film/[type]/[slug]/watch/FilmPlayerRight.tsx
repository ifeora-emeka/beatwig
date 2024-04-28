"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function FilmPlayerRight({
    activeSeason,
    activeEpisode,
    episodeList,
    seasonList,
}: {
    activeSeason: string;
    activeEpisode: string;
    seasonList: any[];
    episodeList: any[];
}) {
    const { slug, type } = useParams();
    const [season, setSeason] = useState(0);
    const [episode, setEpisode] = useState(0);

    useEffect(() => {
        setSeason(activeSeason ? parseInt(activeSeason) : 0);
        setEpisode(activeEpisode ? parseInt(activeEpisode) : 0);
    }, [activeSeason, activeEpisode]);

    return (
        <>
            <div
                className={
                    "flex flex-col bg-card rounded-lg md:min-w-80 md:max-w-80 overflow-hidden"
                }
            >
                {!activeEpisode ? (
                    <>
                        <div
                            className={
                                "h-14 flex items-center text-muted border-b px-default_spacing"
                            }
                        >
                            <h6>Seasons</h6>
                        </div>
                        <div
                            className={
                                "flex-1 overflow-y-auto flex flex-col p-default_spacing"
                            }
                        >
                            {seasonList.map((val, i) => {
                                return (
                                    <Link
                                        href={`/film/${type}/${slug}/watch?season=${i + 1}&episode=1`}
                                    >
                                        <EachSeason
                                            key={crypto.randomUUID()}
                                            heading={val?.title}
                                            subHeading={val?.overview}
                                            img={val?.image}
                                            isActive={season == i + 1}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={
                                "h-14 flex items-center text-muted border-b px-default_spacing gap-default_spacing"
                            }
                        >
                            <Link
                                href={`/film/${type}/${slug}/watch?season=${season}`}
                                className={"text-muted"}
                            >
                                <BiLeftArrowAlt size={25} />
                            </Link>
                            <h6>Seasons {activeSeason}</h6>
                        </div>
                        <div
                            className={
                                "flex-1 overflow-y-auto flex flex-col p-default_spacing"
                            }
                        >
                            {episodeList.map((val, i) => {
                                return (
                                    <Link
                                        href={`/film/${type}/${slug}/watch?season=${season}&episode=${i + 1}`}
                                    >
                                        <EachSeason
                                            key={crypto.randomUUID()}
                                            heading={`Episode ${i + 1}`}
                                            subHeading={
                                                val?.title +
                                                " - " +
                                                val?.runtime
                                            }
                                            img={val?.image}
                                            isActive={episode == i + 1}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

type Section = {
    heading: string;
    subHeading: string;
    img: string;
    isActive?: boolean;
};

const EachSeason = ({ img, heading, subHeading, isActive }: Section) => {
    return (
        <div
            className={cn(
                "flex rounded-lg min-h-24 overflow-hidden hover:bg-hover gap-default_spacing p-default_spacing",
                {
                    "bg-hover": isActive,
                },
            )}
        >
            <div
                className={
                    "min-h-90 bg-cover bg-center rounded-lg min-w-14 bg-black"
                }
                style={{
                    backgroundImage: `url(${img || "/assets/img/user.webp"})`,
                }}
            />
            <div className={"flex-col gap-default_spacing flex-1"}>
                <h5>{heading}</h5>
                <div
                    className={
                        "max-h-[2.7rem] text-sm text-muted overflow-hidden"
                    }
                >
                    {subHeading}
                </div>
                {/*<small className={'line-clap-2 truncate text-muted '}>{subHeading}</small>*/}
            </div>
            <div
                className={cn("w-2 rounded-lg", {
                    "bg-primary ": isActive,
                })}
            />
        </div>
    );
};
