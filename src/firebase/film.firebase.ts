import { setDoc, doc, DocumentReference, getDoc, deleteDoc, collection, query, where, getDocs, serverTimestamp, orderBy, limit, Timestamp } from "firebase/firestore";
import { db, dbCollectionName } from "./index.firebase";
import { FilmBookmarkDTO } from "@/types/film.types";

export const createFilmBookmark = async ({ filmData, user_id, user_ref }: { filmData: FilmBookmarkDTO; user_id: string; user_ref: DocumentReference; }) => {
    const customDocId = `${user_id}::${filmData.film_id}`;
    const bookmarkRef = doc(db, dbCollectionName.FILM_BOOKMARK, customDocId);

    const deleteAtDate = new Date();
    deleteAtDate.setMonth(deleteAtDate.getMonth() + 8);

    let payload = {
        ...filmData,
        user_ref,
        user_id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deleteAt: Timestamp.fromDate(deleteAtDate),
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

export const getAllUserBookmarks = async (user_id: string): Promise<FilmBookmarkDTO[]> => {
    try {
        if (!user_id) {
            alert("no user ID")
        }
        const bookmarksRef = collection(db, dbCollectionName.FILM_BOOKMARK);
        const q = query(
            bookmarksRef,
            where("user_id", "==", user_id),
            orderBy("createdAt", "desc"),
            limit(20)
        );

        const querySnapshot = await getDocs(q);

        const bookmarks: any[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // createdAt: doc.data()?.createdAt?.toDate(), 
            // updatedAt: doc.data()?.updatedAt?.toDate()
        }));

        return bookmarks;
    } catch (error) {
        console.error('Error fetching user bookmarks:', error);
        throw error;
    }
}