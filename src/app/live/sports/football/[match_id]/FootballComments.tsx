import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function FootballComments({}: Props) {
    return (
        <div className="bg-card lg:rounded-lg md:p-default_spacing h-full w-full">
            <div className={"flex flex-col h-full bg-red-300"}>
                <div className={"h-10 bg-blue-400 w-full"}></div>
                <div
                    className={
                        "h-10 bg-green-400 w-full flex-1 overflow-y-auto overflow-x-hidden"
                    }
                >

                </div>
                <div className={"h-10 bg-orange-400 w-full"}></div>
            </div>
        </div>
    );
}

const ChatInput = () => {
    return <div>Input</div>;
};
