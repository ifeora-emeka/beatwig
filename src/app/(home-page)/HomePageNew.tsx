'use client'

import { TbBookmark, TbSearch } from "react-icons/tb";
import { useAuthContext } from "@/context/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAppContext } from "@/context/app.context";
import { getRandomNumber } from "@/utils/index.utils";

const banners = [
'https://teaser-trailer.com/wp-content/uploads/2017/07/Avengers-Infinity-War-Banner.jpg',
    'https://cdna.artstation.com/p/assets/images/images/017/022/542/large/amirhosein-naseri-desktop-screenshot-2019-04-03-18-17-47-11.jpg?1554338571',
    'https://images.thedirect.com/media/article_full/marvel-posters-ranked.jpg',
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdeadline.com%2F2022%2F04%2Ffrom-renewed-season-2-epix-harold-perrineau-1235008774%2F&psig=AOvVaw1U5Gk5QkDvYZYRR_NwK0gv&ust=1723668953972000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjOv7Ht8ocDFQAAAAAdAAAAABAx'

]

export default function HomePageNew(){
    const { user } = useAuthContext();
    const { setAppContextState } = useAppContext();


    return <>
        <div className={'min-h-screen flex items-center justify-center z-50'}>
            <div
                className={'h-16 min-h-16 border-b border-border fixed w-full px-default_spacing top-0 left-0 right-0 justify-between flex items-center z-50'}>
                <div></div>
                <div className={'flex gap-default_spacing'}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant="outline"
                                    className="bg-inherit text-muted hover:bg-card hover:text-muted">
                                <TbBookmark size={25} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Your bookmarks</p>
                        </TooltipContent>
                    </Tooltip>

                    {
                        user ? <Avatar>
                            <AvatarImage src={user.avatar_url || '/assets/img/avatar.webp'} alt={'user'} />
                            <AvatarFallback>YO</AvatarFallback>
                        </Avatar> : <Button variant={'outline'} className={'bg-background text-muted'}>
                            Login
                        </Button>
                    }
                </div>
            </div>


            <div className={'flex flex-col lg:w-[700px] items-center gap-10 w-full px-default_spacing z-50'}>
                <div className={'flex flex-col items-center gap-default_spacing'}>
                    <img src={"/brand_prev_ui.png"} alt={"beat wig"} width={80} />
                    <h1 className={"text-4xl font-bold"}>BeatWig</h1>
                </div>
                <div
                    onClick={() => setAppContextState({
                        showSearch: true
                    })}
                    className={"border-border border rounded-full flex w-full bg-card text-card-foreground hover:shadow-md p-default_spacing cursor-pointer items-center hover:border-secondary z-50"}>
                    <p className={'flex-1 text-muted'}>Search movies and tv shows...</p>
                    <div className={'text-muted'}>
                        <TbSearch size={30} />
                    </div>
                </div>
            </div>
        </div>
        <div  className={'opacity-10 fixed z-0 top-0 left-0 right-0 bottom-0 bg-no-repeat max-h-[60vh] flex items-end bg-center'} style={{ backgroundImage: `url(${banners[getRandomNumber(0, banners.length - 1)]})`}}>
            <div className={'bg-gradient-to-t from-background via-background/50 to-[#fff0] min-h-60 w-full z-50'}>

            </div>
        </div>
    </>
}
