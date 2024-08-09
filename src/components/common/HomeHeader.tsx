"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { SearchIcon, User, SunIcon, BookmarkIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next13-progressbar";
import { useAuthContext } from "@/context/auth.context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiPowerOff, BiUser } from "react-icons/bi";
import Link from "next/link";
import { useAppContext } from "@/context/app.context";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


type Props = {};

export default function HomeHeader({ }: Props) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const auth = getAuth();
    const { setTheme, theme } = useTheme();
    const { user, setAuthContextState } = useAuthContext();

    const {
        setAppContextState,
    } = useAppContext();

    const logout = async () => {
        signOut(auth).then(() => {
            setAuthContextState({
                user: null,
            })
        }).catch((error) => {
            alert("An error happened.");
        });
    }

    const openBookmark = () => {
        if (!user) {
            setAuthContextState({ show_login: true })
        }else {
            router.push(`/user/${user._id}/bookmarks`);
        }
    }

    useEffect(() => {
        setShow(true);
    }, [])

    if (!show) {
        return null;
    }


    return (
        <>
            <Card className="px-5 py-3 z-50 flex gap-5 justify-between sticky top-0 bg-card">
                <Link href={"/"} className={"flex items-center"}>
                    <BrandLogo size={35} />
                </Link>
                <div className="flex gap-5 items-center">
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                onClick={() => setAppContextState({ showSearch: true })}
                                variant="outline"
                                size="icon"
                                className="bg-inherit text-muted hover:bg-card hover:text-muted"
                            >
                                <SearchIcon className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Search</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                onClick={openBookmark}
                                variant="outline"
                                size="icon"
                                className="bg-inherit text-muted hover:bg-card hover:text-muted"
                            >
                                <BookmarkIcon className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Your bookmarks</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                variant="outline"
                                size="icon"
                                className="bg-inherit text-muted hover:bg-card hover:text-muted"
                            >
                                {
                                    theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />
                                }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle theme</p>
                        </TooltipContent>
                    </Tooltip>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div
                                    className={
                                        "h-10 w-10 overflow-hidden rounded-full"
                                    }
                                >
                                    <Image
                                        src={user?.avatar_url || ''}
                                        alt={user?.display_name || 'no display name'}
                                        width={70}
                                        height={70}
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={'bg-card text-muted'}>
                                {
                                    process.env.NODE_ENV !== "production" && <DropdownMenuItem>
                                        <BiUser
                                            size={20}
                                            className={"text-muted"}
                                        />
                                        My Account
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuSeparator
                                    className={"bg-border"}
                                />
                                <DropdownMenuItem onClick={logout}>
                                    <BiPowerOff
                                        size={20}
                                        className={"text-muted"}
                                    />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={() => setAuthContextState({ show_login: true })}
                            variant="outline"
                            size="icon"
                            className="bg-inherit text-muted hover:bg-card hover:text-muted"
                        >
                            <User className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </Card>
        </>
    );
}
