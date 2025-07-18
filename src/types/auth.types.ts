import { DocumentReference, Timestamp } from "@firebase/firestore";

export interface UserData {
    _id: string;
    username: string;
    display_name: string;
    email: string;
    provider: string;
    avatar_url: string | null;

    last_seen: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;

    ref?: DocumentReference | null;
}

