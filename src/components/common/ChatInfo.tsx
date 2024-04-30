"use client";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth.context";
import { MatchMessageData } from "@/types/message.types";

type Props = {
    data: MatchMessageData;
};

export default function ChatInfo({ data }: Props) {
    const { user } = useAuthContext();
    return (
        <div
            className={cn("p-2 rounded-xl group", {
                "pb-default_spacing": !user,
            })}
        >
            <div className={"flex gap-default_spacing items-center"}>
                <div
                    className={
                        "flex gap-default_spacing items-center flex-col justify-start h-[30px] min-w-[30px] max-w-[30px]"
                    }
                >
                    <img
                        src={
                            data.sender?.avatar_url
                                ? String(data.sender.avatar_url)
                                : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c9f4a40760693.578c9a4699778.gif"
                        }
                        alt={"user"}
                        className={"rounded-full"}
                    />
                </div>
                <div className={"flex flex-col items-center"}>
                    <div className={"flex items-center gap-default_spacing"}>
                        <small className={"text-muted"}>
                            {data?.sender?._id == user._id ? "You" : data.sender?.display_name}
                        </small>
                        <small className={'text-muted'}>{data.content}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
