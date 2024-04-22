"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Next13ProgressBar } from "next13-progressbar";
import { themeColor } from "./constants";
import { MatchProvider } from "@/context/match.context";

export default function Providers({ children }: any) {
    return (
        <>
            <Next13ProgressBar
                height="4px"
                color={themeColor}
                options={{ showSpinner: false }}
                showOnShallow
            />
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <MatchProvider>{children}</MatchProvider>
            </ThemeProvider>
        </>
    );
}
