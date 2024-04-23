import { Timestamp } from "@firebase/firestore";

export interface MatchMessageData {
    _id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    match_id: string | null;
    content: string;
}


