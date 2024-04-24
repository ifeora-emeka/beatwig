"use client";
import { useEffect } from "react";
import { createMatchMessage } from "@/firebase/messages.firebase";
import { useAuthContext } from "@/context/auth.context";
import { useParams } from "next/navigation";

export default function MatchOnboarding() {
    const { match_id } = useParams();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user && match_id && user?.ref) {
            createMatchMessage({
                content: "just joined the chat",
                is_notification: true,
                user_ref: user.ref,
                match_id: String(match_id).trim().toLocaleLowerCase(),
            });
        }

        return () => {
            console.log("UNMOUNTED");
            if (user && match_id && user?.ref) {
                createMatchMessage({
                    content: "left the chat",
                    is_notification: true,
                    user_ref: user.ref,
                    match_id: String(match_id).trim().toLocaleLowerCase(),
                });
            }
        };
    }, [user, match_id]);

    return null;
}
