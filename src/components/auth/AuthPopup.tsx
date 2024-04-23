import { BiLogoGoogle, BiLogoFacebook } from "react-icons/bi";
import { useAuthContext } from "@/context/auth.context";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { firebaseTimeStamp } from "@/utils/date-time.utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";

export default function AuthPopup() {
    const {
        user,
        show_login,
        setAuthContextState,
        getAuthDependencies,
        createNewUser,
    } = useAuthContext();
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleAuth = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        setLoading(true);
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);

                const token = credential?.accessToken;
                const user = result.user;

                if (user.email) {
                    const userRef = doc(db, dbCollectionName.USERS, user.uid);
                    const userSnapshot = await getDoc(userRef);

                    if (userSnapshot.exists()) {
                        await getAuthDependencies(user?.uid as string);
                        setLoading(false);
                    } else {
                        await createNewUser({
                            email: user.email,
                            provider: user.providerData[0].providerId,
                            _id: user.uid,
                            avatar_url: user.photoURL || null,
                            createdAt: firebaseTimeStamp(),
                            updatedAt: firebaseTimeStamp(),
                            display_name: user.displayName || "user-" + Date.now(),
                            last_seen: firebaseTimeStamp(),
                            username: "user-" + Date.now(),
                        });
                        setLoading(false);
                    }
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };

    if (!show_login) {
        return null;
    }

    if (user && user?.display_name) {
        return null;
    }

    return (
        <div
            className={
                "bg-black/40 h-[100vh] w-[100vw] fixed top-0 bottom-0 flex justify-center md:items-center items-end"
            }
            style={{ zIndex: 100 }}
        >
            <div
                className={
                    "px-5 py-2 bg-card md:rounded-lg rounded-tl-lg rounded-tr-lg md:w-[450px] md:h-[300px]- w-full flex flex-col gap-default_spacing_lg"
                }
            >
                {!user && (
                    <>
                        <center className={"py-default_spacing_lg"}>
                            <h3 className={"text-muted"}>Login / Signup</h3>
                        </center>
                        <button
                            onClick={handleGoogleAuth}
                            className={
                                "flex justify-center gap-default_spacing items-center bg-white/20 w-full rounded-lg py-default_spacing"
                            }
                        >
                            <BiLogoGoogle size={25} /> With Google
                        </button>
                        {process.env.NODE_ENV !== "production" && (
                            <button
                                className={
                                    "flex justify-center gap-default_spacing items-center bg-white/20 w-full rounded-lg py-default_spacing"
                                }
                            >
                                <BiLogoFacebook size={25} /> With Facebook
                            </button>
                        )}
                        <button
                            className={"text-muted py-default_spacing_lg"}
                            onClick={() =>
                                setAuthContextState({ show_login: false })
                            }
                        >
                            Cancel
                        </button>
                    </>
                )}
                {user && !user?.displayName && (
                    <>
                        <center className={"py-default_spacing_lg"}>
                            <h3 className={"text-muted"}>Enter display name</h3>
                        </center>
                        <Input
                            placeholder={"Ex. johnDoe"}
                            className={
                                "outline-0 text-center py-default_spacing min-h-14"
                            }
                            onChange={(e) => setDisplayName(e.target.value)}
                            autoFocus
                        />
                        <button
                            disabled={loading}
                            // onClick={updateDisplayName}
                            className={
                                "flex justify-center gap-default_spacing items-center bg-primary text-white w-full rounded-lg py-default_spacing"
                            }
                        >
                            {loading ? "Loading...": "Continue"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
