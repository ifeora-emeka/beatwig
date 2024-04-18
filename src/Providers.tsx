'use client'
import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"

export default function Providers({ children }:any) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </>
    )
}
