import { BiLogoGoogle, BiLogoFacebook } from "react-icons/bi";
import { useAuthContext } from "@/context/auth.context";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "@firebase/auth";
import { firebaseTimeStamp } from "@/utils/date-time.utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, dbCollectionName } from "@/firebase/index.firebase";
import Cookies from "js-cookie";

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

                    Cookies.set('user_id', `${user.uid}`);

                    if (userSnapshot.exists()) {
                        await getAuthDependencies(user?.uid as string);
                        setLoading(false);
                    } else {
                        const displayName = user?.displayName && user?.displayName?.length > 17 ? user.displayName.slice(0, 17) : user.displayName || "user-" + Date.now();

                        await createNewUser({
                            email: user.email,
                            provider: user.providerData[0].providerId,
                            _id: user.uid,
                            avatar_url: user.photoURL || null,
                            createdAt: firebaseTimeStamp(),
                            updatedAt: firebaseTimeStamp(),
                            display_name: displayName,
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

    useEffect(() => {
        (async () => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    getAuthDependencies(uid);
                } else {
                    setAuthContextState({ auth_loading: false });
                }
            });
        })();
    }, []);

    const updateDisplayName = async () => {
        if (displayName && user) {
            setLoading(true);

            const washingtonRef = doc(db, dbCollectionName.USERS, user?._id);
            await updateDoc(washingtonRef, {
                display_name: displayName
            });
            await getAuthDependencies(user._id);

            setLoading(false);
        }
    }

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
                            <h3 className={"text-muted"}>Login / Register</h3>
                        </center>
                        <EachMethod onClick={handleGoogleAuth}>
                            <BiLogoGoogle size={25} /> With Google
                        </EachMethod>

                        {process.env.NODE_ENV !== "production" && (
                            <EachMethod onClick={handleGoogleAuth}>
                                <BiLogoFacebook size={25} /> With Facebook
                            </EachMethod>
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
                {user && !user?.display_name && (
                    <>
                        <center className={"py-default_spacing_lg"}>
                            <h3 className={"text-muted"}>Enter display name</h3>
                        </center>
                        <Input
                            placeholder={"Ex. johnDoe"}
                            className={
                                "outline-0 text-center py-default_spacing min-h-14 text-white"
                            }
                            onChange={(e) => setDisplayName(e.target.value)}
                            value={displayName}
                            maxLength={17}
                            autoFocus
                        />
                        <button
                            disabled={loading}
                            onClick={updateDisplayName}
                            className={
                                "flex justify-center gap-default_spacing items-center bg-primary text-white w-full rounded-lg py-default_spacing"
                            }
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                        <br />
                    </>
                )}
            </div>
        </div>
    );
}

const EachMethod = ({ onClick, children }: { onClick: () => void; children: any }) => {
    return <>
        <button
            onClick={onClick}
            className={
                "flex justify-center gap-default_spacing items-center bg-white/50 w-full rounded-lg py-default_spacing hover:bg-white/70"
            }
        >
            {children}
        </button>
    </>
}
