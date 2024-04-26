"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ChatBobble, { ChatListLoading } from "@/components/common/ChatBobble";
import ChatInput from "@/components/common/ChatInput";
import {
    collection,
    DocumentReference,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from "@firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import { useParams } from "next/navigation";
import { MatchMessageData, MatchMessageDTO } from "@/types/message.types";
import { useAuthContext } from "@/context/auth.context";
import { getDoc } from "firebase/firestore";
import { createMatchMessage } from "@/firebase/messages.firebase";
import ChatInfo from "@/components/common/ChatInfo";

type Props = {};

export default function FootballComments({}: Props) {
    const { user, setAuthContextState } = useAuthContext();
    const { match_id } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const [messageList, setMessageList] = useState<MatchMessageData[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message: string) => {
        try {
            if (!user || !user.ref) {
                return setAuthContextState({ show_login: true });
            }

            let payload: MatchMessageDTO = {
                content: message,
                match_id: String(match_id).trim().toLocaleLowerCase(),
                user_ref: user.ref,
                is_notification: false,
            };

            await createMatchMessage(payload);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (match_id) {
            setLoading(true);
            const messagesRef = collection(db, dbCollectionName.MESSAGES);
            const q = query(
                messagesRef,
                where(
                    "match_id",
                    "==",
                    String(match_id).trim().toLocaleLowerCase(),
                ),
                orderBy("createdAt"),
                limit(50),
            );

            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const messages: any = [];
                const userPromises: any = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const user_ref = data.user_ref;
                    userPromises.push(getUserData(user_ref));
                    messages.push({
                        ...data,
                        _id: doc.id,
                    });
                });

                const users = await Promise.all(userPromises);
                const messagesWithUsers = messages.map(
                    (message: any, index: number) => ({
                        ...message,
                        sender: users[index],
                    }),
                );

                setLoading(false);
                setMessageList(messagesWithUsers);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [match_id]);

    const getUserData = async (user_ref: DocumentReference) => {
        const userDoc = await getDoc(user_ref);
        return userDoc.data();
    };

    return (
        <div className="bg-card lg:rounded-lg  h-full w-full">
            <div className={"flex flex-col h-full"}>
                <div className={"md:p-default_spacing px-default_spacing h-[58px] md:h-auto flex items-center justify-center"}>
                    <div
                        className={
                            "h-12 bg-background gap-default_spacing flex items-center rounded-full w-full px-default_spacing"
                        }
                    >
                        {["Chat", "Replies"].map((label, i) => {
                            return (
                                <button
                                    className={cn("px-4 py-1 rounded-full ", {
                                        "bg-primary text-white shadow-md": tabIndex === i,
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
                    {messageList?.map((chat: MatchMessageData, i) => {
                        if (chat.is_notification) {
                            return <ChatInfo data={chat} key={chat._id} />;
                        }
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
