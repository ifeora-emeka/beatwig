"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ChatBobble, { ChatListLoading } from "@/components/common/ChatBobble";
import ChatInput from "@/components/common/ChatInput";
import { PendingMessage, useMatchContext } from "@/context/match.context";
import { addDoc, collection, doc, getFirestore, limit, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import { serverTimestamp } from "@firebase/firestore";
import { useParams } from "next/navigation";

type Props = {};

export default function FootballComments({}: Props) {
    const { match_id } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message: string) => {
        try {
            let _id = crypto.randomUUID().toString();
            const messagesRef = collection(db, dbCollectionName.MESSAGES);
            await addDoc(messagesRef, {
                _id,
                message,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                match_id
            });
            console.log("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (match_id) {
            setLoading(true)
            const messagesCollectionRef = collection(db, dbCollectionName.MESSAGES);
            console.log('THE ID::',match_id);
            const queryRef = query(
                messagesCollectionRef,
                // where("match_id", "==", match_id),
                orderBy("createdAt"),
                limit(50)
            );

            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                const messages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLoading(false)
                setMessageList(messages as any);
            });

            return () => unsubscribe();
        }
    }, [match_id]);

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
                                    key={crypto.randomUUID()}
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
                    {loading && <ChatListLoading />}
                    {messageList?.map((chat: PendingMessage, i) => {
                        return (
                            <ChatBobble key={chat._id} data={chat} isPending />
                        );
                    })}
                </div>
                <div className={"p-default_spacing"}>
                    <ChatInput onSend={sendMessage} />
                </div>
            </div>
        </div>
    );
}
