import { DocumentReference, Timestamp } from "@firebase/firestore";
import { UserData } from "@/types/auth.types";

export interface MatchMessageData {
    _id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    match_id: string | null;
    content: string;
    user_ref: DocumentReference

    sender?: UserData | null;

}


