'use client'
import HomeHeader from "@/components/common/HomeHeader";
import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
    children: any;
    withTopLinks?: boolean;
}

export default function PageContainer({ children, withTopLinks }: Props) {
    const pathname = usePathname();
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
            link: "/movies",
        },
        // {
        //     label: "TV Series",
        //     link: "/",
        // },
        // {
        //     label: "Software",
        //     link: "/",
        // },
    ];

    return (
        <div className="flex justify-center">
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <main className="flex flex-col gap-default_spacing_xl">
                        {withTopLinks ? <nav

                        >
                            <ul className={
                                "flex gap-default_spacing items-center overflow-x-auto py-default_spacing md:px-0 px-default_spacing"
                            }>
                                {topLinks.map((link) => {
                                    return (
                                        <li key={crypto.randomUUID()}>
                                            <Link
                                                href={link.link}
                                            >
                                                <div className={cn("px-8 py-2 rounded-lg", {
                                                    "bg-primary text-white": pathname === link.link,
                                                    "text-muted": pathname !== link.link,
                                                })}>
                                                    {link.label}
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>: <div />}
                        {children}
                    </main>
                </div>
            </Container>
        </div>
    );
}
