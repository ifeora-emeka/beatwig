"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RefreshCwIcon } from 'lucide-react'
import React from "react";

export default function ErrorPage(props:any) {
    console.log('THE ERROR:::', props)
    const router = useRouter();

    const handleReload = () => {
        router.refresh();
        window.location.reload();
    }

    return (
        <div className="min-h-[100vh] w-full flex justify-center items-center flex-col gap-5">
            <h1 className="font-bold text-7xl text-muted">500</h1>
            <h1 className="text-3xl text-muted mb-default_spacing_lg">Application Error!</h1>
            <Button onClick={handleReload} className="flex gap-default_spacing"><RefreshCwIcon /> Reload</Button>
        </div>
    );
}
