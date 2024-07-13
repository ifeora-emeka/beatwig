"use client";
import { Card } from "@/components/ui/card";
import React from "react";
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
import SearchPopup from "@/components/common/SearchPopup";
import { useAppContext } from "@/context/app.context";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "next-themes";


type Props = {};

export default function HomeHeader({ }: Props) {
    const auth = getAuth();
    const { setTheme, theme } = useTheme();
    const { user, setAuthContextState } = useAuthContext();
    const {
        appState: { showSearch },
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

    return (
        <>
            {showSearch && <SearchPopup />}
            <Card className="px-5 py-3 z-50 flex gap-5 justify-between sticky top-0 bg-card">
                <Link href={"/"} className={"flex items-center"}>
                    <BrandLogo size={35} />
                </Link>
                <div className="flex gap-5 items-center">
                    <Button
                        onClick={() => setAppContextState({ showSearch: true })}
                        variant="outline"
                        size="icon"
                        className="bg-inherit text-muted hover:bg-card hover:text-muted"
                    >
                        <SearchIcon className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-inherit text-muted hover:bg-card hover:text-muted"
                    >
                        <BookmarkIcon className="h-5 w-5" />
                    </Button>
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
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div
                                    className={
                                        "h-10 w-10 overflow-hidden rounded-full"
                                    }
                                >
                                    <img
                                        src={user?.avatar_url || ''}
                                        alt={user.display_name}
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
