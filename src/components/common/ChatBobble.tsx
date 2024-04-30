import { Skeleton } from "@/components/ui/skeleton";
import { MatchMessageData } from "@/types/message.types";
import moment from "moment-timezone";
import { BiSolidQuoteAltRight, BiTrash } from "react-icons/bi";
import { useAuthContext } from "@/context/auth.context";
import { cn } from "@/lib/utils";
import { deleteMessage } from "@/firebase/messages.firebase";

type Props = {
    data: MatchMessageData;
    isPending?: boolean;
};

export default function ChatBobble({ data, isPending }: Props) {
    const { user } = useAuthContext();

    const deleteMsg = async () => {
        try {
            await deleteMessage(data._id);
        } catch (e) {
            console.error("Error deleting message:", e);
            alert("Error, please try again!");
        }
    };

    return (
        <div
            className={cn(
                "hover:bg-hover pt-default_spacing px-default_spacing rounded-xl group",
                {
                    "pb-default_spacing": !user,
                },
            )}
        >
            <div className={"flex gap-default_spacing items-start"}>
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
                <div className={"flex flex-col"}>
                    <div className={"flex items-center gap-default_spacing"}>
                        <small className={"text-muted"}>
                            {user._id == data.sender?._id ? "You" : data.sender?.display_name}
                        </small>
                        <small className={"text-muted"}>
                            {moment(data.createdAt.toDate()).fromNow()}
                        </small>
                    </div>
                    <small className={'text-white'}>{data.content}</small>
                    {user && (
                        <>
                            <div
                                className={
                                    "flex gap-default_spacing md:opacity-0 group-hover:opacity-100 md:h-0 h-7 md:group-hover:h-7 smooth-transition items-center"
                                }
                            >
                                {user._id == data.sender?._id ? (
                                    <button
                                        onClick={deleteMsg}
                                        className={
                                            "flex gap-1 text-muted items-center text-xs hover:text-red-500"
                                        }
                                    >
                                        <BiTrash />
                                        Delete
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className={
                                                "flex gap-1 text-muted items-center text-xs hover:text-primary"
                                            }
                                        >
                                            <BiSolidQuoteAltRight />
                                            Reply
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export const ChatListLoading = () => {
    return (
        <>
            {new Array(7).fill(null).map((_) => {
                return (
                    <div
                        className={
                            "hover:bg-hover p-default_spacing rounded-xl opacity-40"
                        }
                        key={crypto.randomUUID()}
                    >
                        <div className={"flex gap-default_spacing items-start"}>
                            <div
                                className={
                                    "flex gap-default_spacing items-center flex-col justify-start h-[30px] min-w-[30px] max-w-[30px]"
                                }
                            >
                                <Skeleton
                                    className={"h-full w-full rounded-full"}
                                />
                            </div>
                            <div
                                className={"flex flex-col gap-default_spacing"}
                            >
                                <div
                                    className={
                                        "flex items-center gap-default_spacing w-full"
                                    }
                                >
                                    <Skeleton className={"w-28 h-3"} />
                                    <Skeleton className={"w-20 h-3"} />
                                </div>
                                <small
                                    className={
                                        "flex flex-col gap-default_spacing"
                                    }
                                >
                                    <Skeleton className={"w-[80%] h-3"} />
                                    <Skeleton className={"w-[40%] h-3"} />
                                </small>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
