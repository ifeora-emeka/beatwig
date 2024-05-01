"use client";
import React from "react";

export default function error() {
    return (
        <div className="min-h-[100vh] w-full flex justify-center items-center flex-col gap-5">
            <h1 className="font-bold text-7xl text-muted">500</h1>
            <h1 className="text-3xl text-muted">Application Error!</h1>
        </div>
    );
}
