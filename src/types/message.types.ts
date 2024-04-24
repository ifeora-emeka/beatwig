import { DocumentReference, Timestamp } from "@firebase/firestore";
import { UserData } from "@/types/auth.types";

export interface MatchMessageData {
    _id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    match_id: string | null;
    content: string;
    user_ref: DocumentReference
    is_notification: boolean;

    sender?: UserData | null;

}

export interface MatchMessageDTO {
    content: string;
    match_id: string | null;
    user_ref: DocumentReference;
    is_notification: boolean;
}

