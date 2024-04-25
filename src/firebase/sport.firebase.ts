import { createMatchMessage } from "@/firebase/messages.firebase";
import { UserData } from "@/types/auth.types";


export const joinMatchChat = (user: UserData, match_id: string) => {
    if (user && match_id && user?.ref) {
        createMatchMessage({
            content: "just joined the chat",
            is_notification: true,
            user_ref: user.ref,
            match_id: String(match_id).trim().toLocaleLowerCase(),
        });
    }
}

