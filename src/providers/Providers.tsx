"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Next13ProgressBar } from "next13-progressbar";
import { themeColor } from "../constants";
import { MatchProvider } from "@/context/match.context";
import { AuthProvider } from "@/context/auth.context";
import AuthPopup from "@/components/auth/AuthPopup";
import { AppProvider } from "@/context/app.context";
import { Toaster } from "@/components/ui/toaster"


export default function Providers({ children }: any) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Next13ProgressBar
                    height="4px"
                    color={themeColor}
                    options={{ showSpinner: false }}
                    showOnShallow
                />
                <Toaster />
                <AppProvider>
                    <AuthProvider>
                        <MatchProvider>
                            <AuthPopup />
                            {children}
                        </MatchProvider>
                    </AuthProvider>
                </AppProvider>
            </ThemeProvider>
        </>
    );
}
