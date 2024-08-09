'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TbBookmark, TbBookmarkFilled } from "react-icons/tb";
import { FilmData, FilmType } from "@/types/film.types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { createFilmBookmark, removeBookmark } from "@/firebase/film.firebase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/context/auth.context";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";


export default function FilmInfo({ filmData, bookmarked }: { bookmarked: boolean, filmData: FilmData & { info: any } }){
    const [show, setShow] = useState(false);
    const { slug, type } = useParams();
    const { user, setAuthContextState } = useAuthContext();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { toast } = useToast()

    const res = filmData;

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
                            poster: res.poster,
                            //@ts-ignore
                            date: res?.release,
                            slug: slug as string,
                            title: res.title,
                            type: type as FilmType,
                            film_id: slug as string,
                            overview: res.overview
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

    useEffect(() => {
        if(bookmarked) {
            setIsBookmarked(true)
        }
    }, [bookmarked]);

    return <>
        <div className={'p-default_spacing bg-card rounded-lg min-h-24 flex gap-default_spacing'}>
            <div className={'relative h-20 w-20 min-w-20 min-h-20 rounded-xl overflow-hidden'}>
                <Image src={res.poster as any} alt={res.title} fill className={'absolute'} />
            </div>
            <div className={'flex-1 truncate flex flex-col justify-between'}>
                <div className={'flex flex-col'}>
                    <h1 className={"text-xl"}>{res?.title}</h1>
                    <p className={"truncate text-muted text-sm"}>{res.overview}</p>
                </div>
                <small className={"truncate text-muted text-sm"}>Status: {res?.info?.status}</small>
            </div>
            <div className={'min-w-20 flex justify-center items-center'}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleBookmark} variant={'outline'} size={'icon'}
                                    className={cn('text-muted hover:bg-primary hover:text-primary-foreground', {
                                        "bg-primary text-primary-foreground": isBookmarked
                                    })}>
                                {
                                    isBookmarked ? <TbBookmarkFilled size={25} />:<TbBookmark size={25} />
                                }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save this film</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </>;
}
