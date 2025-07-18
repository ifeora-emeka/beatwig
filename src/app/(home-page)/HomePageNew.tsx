"use client";
import { TbBookmark, TbSearch } from "react-icons/tb";
import { useAuthContext } from "@/context/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppContext } from "@/context/app.context";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next13-progressbar";
import Link from "next/link";


export default function HomePageNew() {
    const { user, setAuthContextState } = useAuthContext();
    const { setAppContextState } = useAppContext();
    const { setTheme, theme } = useTheme();
    const router = useRouter();

    const openBookmark = () => {
        if (!user) {
            setAuthContextState({ show_login: true });
        } else {
            router.push(`/user/${user._id}/bookmarks`);
        }
    };

    return (
        <>
            <div
                className={"min-h-screen flex items-center justify-center z-50"}
            >
                <div
                    className={
                        "h-16 min-h-16 border-border fixed w-full px-default_spacing top-0 left-0 right-0 justify-between flex items-center z-50"
                    }
                >
                    <div></div>
                    <div className={"flex gap-default_spacing"}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    onClick={() =>
                                        setTheme(
                                            theme === "dark" ? "light" : "dark",
                                        )
                                    }
                                    variant="outline"
                                    size="icon"
                                    className="bg-inherit text-muted hover:bg-card hover:text-muted"
                                >
                                    {theme === "dark" ? (
                                        <SunIcon className="h-5 w-5" />
                                    ) : (
                                        <MoonIcon className="h-5 w-5" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Toggle theme</p>
                            </TooltipContent>
                        </Tooltip>
                        {
                            user && <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={openBookmark}
                                        size={"icon"}
                                        variant="outline"
                                        className="bg-inherit text-muted hover:bg-card hover:text-muted"
                                    >
                                        <TbBookmark size={25} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Your bookmarks</p>
                                </TooltipContent>
                            </Tooltip>
                        }
                        <Separator orientation="vertical" />
                        {user ? (
                            <Avatar>
                                <AvatarImage
                                    src={
                                        user.avatar_url ||
                                        "/assets/img/avatar.webp"
                                    }
                                    alt={"user"}
                                />
                                <AvatarFallback>YO</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Button
                                onClick={() => setAuthContextState({ show_login: true })}
                                variant={"outline"}
                                className="bg-inherit text-muted hover:bg-card hover:text-muted"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </div>

                <div
                    className={
                        "flex flex-col lg:w-[800px] items-center gap-10 w-full px-default_spacing z-50"
                    }
                >
                    <div
                        className={
                            "flex flex-col items-center gap-default_spacing"
                        }
                    >
                        <img
                            src={"/brand_prev_ui.png"}
                            alt={"beat wig"}
                            width={80}
                        />
                        <h1 className={"text-4xl font-bold"}>BeatWig</h1>
                    </div>
                    <div className={'w-full flex-col gap-default_spacing items-center flex'}>
                        <div
                            onClick={() =>
                                setAppContextState({
                                    showSearch: true,
                                })
                            }
                            className={
                                "border-border border rounded-full flex md:w-[80%] w-full bg-card text-card-foreground hover:shadow-md p-default_spacing cursor-pointer items-center hover:border-secondary z-50"
                            }
                        >
                            <p className={"flex-1 text-muted"}>
                                Search movies and tv shows...
                            </p>
                            <div className={"text-muted"}>
                                <TbSearch size={25} />
                            </div>
                        </div>
                        <div className={'flex justify-start gap-default_spacing_lg'}>
                            <Link href={"/movies"}>
                                <small
                                    className={"py-1 px-4 hover:text-purple-500 border hover:border-purple-500 rounded-lg"}>
                                    Movies & TV
                                </small>
                            </Link>
                            <Link href={"/sports/football"}>
                                <small
                                    className={"py-1 px-4 hover:text-orange-500 border hover:border-orange-500 rounded-lg"}>
                                    Football
                                </small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
