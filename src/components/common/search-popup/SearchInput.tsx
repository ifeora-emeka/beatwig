"use client";
import { useAppContext } from "@/context/app.context";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next13-progressbar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchInput({
    onClose,
    onChange,
    value,
}: {
    onClose: () => void;
    onChange: (e: string) => void;
    value: string;
}) {
    const params = useSearchParams();

    const [keyword, setKeyword] = useState((params.get("q") as string) || "");
    const debouncedKeyword = useDebounce(keyword, 800);
    const { saveSearchHistory } = useAppContext();

    useEffect(() => {
        onChange(debouncedKeyword);
        saveSearchHistory(debouncedKeyword);
    }, [debouncedKeyword]);

    useEffect(() => {
        if (params.get("q")) {
            setKeyword(params.get("q") as string);
        }
    }, [params]);

    useEffect(() => {
        setKeyword(value);
    }, [value]);

    return (
        <>
            <div className="bg-card px-default_spacing_lg py-default_spacing rounded-full flex gap-default_spacing sticky z-[1000] shadow-md transition-all top-0">
                <SearchIcon className="text-muted" />
                <input
                    className="flex-1 bg-card outline-none"
                    placeholder="Search for movies and TV shows..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    autoFocus
                />
                <button
                    onClick={() => {
                        setKeyword("");
                        onClose();
                    }}
                >
                    <X className="text-muted" />
                </button>
            </div>
        </>
    );
}
