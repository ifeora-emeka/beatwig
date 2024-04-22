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
                    <h1 className={"text-5xl"}>
                        I am using Redux Toolkit to handle all the data. Every
                        page of my application has it's own singular state.
                        State along with Metadata is fetched/populated at page
                        load. Now i want to set Metadata based on the data
                        present in state. I've already tried generateMetadata
                        provided by nextjs. I have hooks defined in my project
                        which gets the data from state based on current route
                        path. Is there something that i'm missing?
                    </h1>
                </div>
                <div className={"h-10 bg-orange-400 w-full"}></div>
            </div>
        </div>
    );
}

const ChatInput = () => {
    return <div>Input</div>;
};
