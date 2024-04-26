import HomeHeader from "@/components/common/HomeHeader";
import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageContainer({ children }: any) {
    let topLinks: {
        label: string;
        link: string;
    }[] = [
        {
            label: "All",
            link: "/",
        },
        {
            label: "Football",
            link: "/sports/football",
        },
        {
            label: "Movies",
            link: "/",
        },
        {
            label: "TV Series",
            link: "/",
        },
        {
            label: "Software",
            link: "/",
        },
    ];

    return (
        <div className="flex justify-center">
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <main className="flex flex-col gap-default_spacing_xl">
                        <div
                            className={
                                "flex gap-default_spacing items-center overflow-x-auto py-default_spacing md:px-0 px-default_spacing"
                            }
                        >
                            {topLinks.map((link) => {
                                return (
                                    <Link href={link.link}>
                                        <Button className={"text-white"}>
                                            {link.label}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                        {children}
                    </main>
                </div>
            </Container>
        </div>
    );
}
