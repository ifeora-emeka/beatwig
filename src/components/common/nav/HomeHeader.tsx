"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import BrandLogo from "../BrandLogo";
import { User, RefreshCwIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next13-progressbar";
import { useAuthContext } from "@/context/auth.context";


type Props = {};

export default function HomeHeader({}: Props) {
    const router = useRouter();
    const { user } = useAuthContext();

    return (
        <Card className="px-5 py-3 z-50 flex gap-5 justify-between sticky top-0">
            <BrandLogo size={35} />
            <div className="flex gap-5 items-center">
                    <Button
                        onClick={() => router.refresh()}
                        variant="outline"
                        size="icon"
                        className="bg-inherit text-muted"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                {
                    user ? <div className={'h-10 w-10 overflow-hidden rounded-full'}>
                            <img src={user.avatar_url} alt={user.display_name} />
                        </div> :
                        <Button
                            onClick={() => router.refresh()}
                            variant="outline"
                            size="icon"
                            className="bg-inherit text-muted"
                        >
                            <User className="h-5 w-5" />
                        </Button>
                }
            </div>
        </Card>
    );
}
