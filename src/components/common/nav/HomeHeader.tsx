import { Card } from "@/components/ui/card";
import React from "react";
import BrandLogo from "../BrandLogo";
import { CalendarSearch, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

export default function HomeHeader({}: Props) {
    return (
        <Card className="px-5 py-3 z-50 flex gap-5 justify-between sticky top-0">
            <BrandLogo size={35} />
            <div className="flex gap-5 items-center">
                <div className="flex items-center border rounded-md p-2 gap-3">
                    <Search className="text-muted h-5 w-5" />{" "}
                    <input
                        className="placeholder:text-muted outline-none bg-inherit w-full"
                        type="search"
                        placeholder="Search fixtures..."
                    />
                </div>
                <div className="min-w-10">
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-inherit text-muted"
                    >
                        <CalendarSearch className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
