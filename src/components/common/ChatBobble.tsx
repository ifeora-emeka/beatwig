import { useCallback, useEffect } from "react";
import { PendingMessage, useMatchContext } from "@/context/match.context";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { app } from "@/firebase/index.firebase";
import { Skeleton } from "@/components/ui/skeleton";

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

export const ChatListLoading = () => {
    return <>
        {
            new Array(7).fill(null).map(_ => {
                return <div className={"hover:bg-hover p-default_spacing rounded-xl opacity-40"} key={crypto.randomUUID()}>
                    <div className={"flex gap-default_spacing items-start"}>
                        <div
                            className={
                                "flex gap-default_spacing items-center flex-col justify-start h-[30px] min-w-[30px] max-w-[30px]"
                            }
                        >
                            <Skeleton className={'h-full w-full rounded-full'} />
                        </div>
                        <div className={"flex flex-col gap-default_spacing"}>
                            <div className={"flex items-center gap-default_spacing w-full"}>
                                <Skeleton className={'w-28 h-3'} />
                                <Skeleton className={'w-20 h-3'} />
                            </div>
                            <small className={'flex flex-col gap-default_spacing'}>
                                <Skeleton className={'w-[80%] h-3'} />
                                <Skeleton className={'w-[40%] h-3'} />
                            </small>
                        </div>
                    </div>
                </div>
            })
        }
    </>
}

