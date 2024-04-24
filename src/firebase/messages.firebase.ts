import { MatchMessageData, MatchMessageDTO } from "@/types/message.types";
import { addDoc, collection, deleteDoc, DocumentReference } from "@firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import { doc } from "firebase/firestore";
import { firebaseTimeStamp } from "@/utils/date-time.utils";

let messageDefault = () => {
    let _id = crypto.randomUUID().toString();
    return {
        _id,
        createdAt: firebaseTimeStamp(),
        updatedAt: firebaseTimeStamp(),
        removal_date: firebaseTimeStamp(5),
    }
}


export const createMatchMessage = async  (messageData: MatchMessageDTO): Promise<DocumentReference> => {
    const messagesRef = collection(db, dbCollectionName.MESSAGES);
    let payload = {
        ...messageData,
        ...messageDefault()
    }
    console.log('SENDING PAYLOAD::', payload)
    return await addDoc(messagesRef, payload);
}

export const deleteMessage = async (message_id: string) => {
    const messageRef = doc(db, dbCollectionName.MESSAGES, message_id);
    return await deleteDoc(messageRef);
};

