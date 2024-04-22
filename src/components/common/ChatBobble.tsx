import { useCallback, useEffect } from "react";
import { PendingMessage, useMatchContext } from "@/context/match.context";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { app } from "@/firebase/index.firebase";

type Props = {
    data: PendingMessage;
    isPending?: boolean;
};

export default function ChatBobble({ data, isPending }: Props) {
    return (
        <div className={"hover:bg-hover p-default_spacing rounded-xl"}>
            <div className={"flex gap-default_spacing items-start"}>
                <div
                    className={
                        "flex gap-default_spacing items-center flex-col justify-start h-[30px] min-w-[30px] max-w-[30px]"
                    }
                >
                    <img
                        src={
                            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c9f4a40760693.578c9a4699778.gif"
                        }
                        alt={"user"}
                        className={"rounded-full"}
                    />
                </div>
                <div className={"flex flex-col"}>
                    <div className={"flex items-center gap-default_spacing"}>
                        <small>User display name</small>
                        <small className={"text-muted"}>2 minutes ago</small>
                    </div>
                    <small>{data.message}</small>
                </div>
            </div>
        </div>
    );
}
