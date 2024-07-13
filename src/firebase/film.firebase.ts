import { setDoc, doc, DocumentReference, getDoc, deleteDoc } from "firebase/firestore";
import { db, dbCollectionName } from "./index.firebase";
import { FilmBookmarkDTO } from "@/types/film.types";

export const createFilmBookmark = async ({ filmData, user_id }: { filmData: FilmBookmarkDTO; user_id: string; user_ref: DocumentReference; }) => {
    const customDocId = `${user_id}::${filmData.film_id}`;
    const bookmarkRef = doc(db, dbCollectionName.FILM_BOOKMARK, customDocId);
    let payload = {
        ...filmData,
        user_id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    return await setDoc(bookmarkRef, payload);
}

export const getFilmBookmark = async ({ film_id, user_id }: { user_id: string, film_id: string }) => {
    try {
        const customDocId = `${user_id}::${film_id}`;
        const bookmarkRef = doc(db, dbCollectionName.FILM_BOOKMARK, customDocId);

        const bookmarkSnap = await getDoc(bookmarkRef);

        

        if (bookmarkSnap.exists()) {
            return { id: bookmarkSnap.id, ...bookmarkSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.log('THE ERROR:::', error)
    }
}

export const removeBookmark = async ({ film_id, user_id }: { user_id: string, film_id: string }) => {
    const customDocId = `${user_id}::${film_id}`;
    const bookmarkRef = doc(db, dbCollectionName.FILM_BOOKMARK, customDocId);

    return await deleteDoc(bookmarkRef);
}
