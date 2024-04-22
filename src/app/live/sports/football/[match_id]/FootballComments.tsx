"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ChatBobble from "@/components/common/ChatBobble";
import ChatInput from "@/components/common/ChatInput";
import { useMatchContext } from "@/context/match.context";

type Props = {};

export default function FootballComments({}: Props) {
    const [tabIndex, setTabIndex] = useState(0);
    const { addPendingChat, matchState: { pending_messages } } = useMatchContext();

    return (
        <div className="bg-card lg:rounded-lg  h-full w-full">
            <div className={"flex flex-col h-full"}>
                <div className={"md:p-default_spacing px-default_spacing"}>
                    <div
                        className={
                            "h-12 bg-background gap-default_spacing flex items-center rounded-full w-full px-default_spacing"
                        }
                    >
                        {["Discussions", "Reply"].map((label, i) => {
                            return (
                                <button
                                    className={cn("px-4 py-1 rounded-full ", {
                                        "bg-primary": tabIndex === i,
                                        "hover:bg-hover text-muted":
                                            tabIndex !== i,
                                    })}
                                    onClick={() => setTabIndex(i)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div
                    className={
                        "py-default_spacing w-full flex-col flex-1 overflow-y-auto overflow-x-hidden flex"
                    }
                >
                    {pending_messages.map((chat, i) => {
                        return <ChatBobble key={`chat-${i}`} chat={chat} />;
                    })}
                </div>
                <div className={"p-default_spacing"}>
                    <ChatInput onSend={addPendingChat} />
                </div>
            </div>
        </div>
    );
}
