"use client";
import { Badge } from "@/components/ui/badge";
import { BiBookmark, BiPlay, BiSolidBookmark } from "react-icons/bi";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createFilmBookmark, removeBookmark } from "@/firebase/film.firebase";
import { useAuthContext } from "@/context/auth.context";
import { FilmBookmarkDTO, FilmType } from "@/types/film.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function FilmHero({ data, bookmark }: { data: any; bookmark: FilmBookmarkDTO }) {
    const router = useRouter();
    const { slug, type } = useParams();
    const { user, setAuthContextState } = useAuthContext();
    const [isBookmarked, setIsBookmarked] = useState(bookmark ? true : false);
    const { toast } = useToast()

    const handleBookmark = async () => {
        try {
            if (user && user.ref) {
                if (isBookmarked) {
                    setIsBookmarked(false);
                    toast({
                        title: "Bookmark removed",
                        description: "Film removed from bookmarks",
                        duration: 3000,
                        variant: 'default'
                    })
                    await removeBookmark({ film_id: slug as string, user_id: user?._id });
                }else {
                    setIsBookmarked(true);
                    toast({
                        title: "Bookmark",
                        description: "Film bookmarked successfully",
                        duration: 3000,
                        variant: 'default'
                    })
                    await createFilmBookmark({
                        filmData: {
                            poster: data.backdrop,
                            date: data.release,
                            slug: slug as string,
                            title: data.title,
                            type: type as FilmType,
                            film_id: slug as string,
                            overview: data.overview
                        }, user_id: user?._id, user_ref: user.ref
                    });
                }
            } else {
                setAuthContextState({ show_login: true })
            }
        } catch (error) {
            toast({
                title: "Bookmark Error",
                description: "Error, please try again!",
                duration: 5000,
                variant: 'destructive'
            })
            setIsBookmarked(false);
            console.log('ERROR::', error)
            alert('An error occurred while bookmarking this film')
        }
    }

    return (
        <section
            // style={{ backgroundImage: `url(${data.backdrop})`, backgroundSize: '800px' }}
            className={
                "bg-no-repeat rounded-lg overflow-hidden text-white bg-right bg-card text-card-foreground"
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
                            <div className={"border px-3 py-1 rounded-sm text-card-foreground"}>
                                {data?.certification}
                            </div>
                            <div className='text-card-foreground'>{data?.release}</div>
                            <div className=" text-card-foreground">{data?.runtime}</div>
                        </div>
                        <h1 className={"text-3xl mb-2 text-card-foreground"}>{data?.title}</h1>
                        <div className={"flex gap-default_spacing flex-wrap "}>
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
                        <Tooltip>
                            <TooltipTrigger>
                                <button
                                    onClick={() => handleBookmark()}
                                    className={
                                        cn("rounded-full dark:text-card-foreground text-muted text-xl h-11 w-11 flex items-center justify-center hover:bg-primary bg-border", {
                                            "bg-primary text-white": isBookmarked
                                        })
                                    }
                                >
                                    {
                                        isBookmarked ? <BiSolidBookmark size={20} className='text-white' /> : <BiBookmark size={20} className="text-muted" />
                                    }
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Bookmark this</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        <Link
                            href={`/film/${type}/${slug}/watch${type.includes("tv") ? `?season=1&episode=1` : ``}`}
                            className={"flex items-center bg-secondary px-3 py-2 rounded-md text-secondary-foreground"}
                            role={"button"}
                        >
                            <div>
                                <BiPlay size={25} />
                            </div>
                            <span>Watch Now</span>
                        </Link>
                    </div>
                    <div className={"flex flex-col"}>
                        <h3 className=" text-card-foreground">Overview</h3>
                        <p className={"text-sm text-muted"}>{data?.overview}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
