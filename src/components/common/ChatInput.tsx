import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth.context";

interface Props {
    onSend: (message: string) => void;
    isDisabled?: boolean;
    isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading, isDisabled }: Props) => {
    const { user } = useAuthContext();
    const [message, setMessage] = useState("");
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);

    const handleSend = () => {
        if (user) {
            if (message && !isDisabled && !isLoading) {
                onSend(message);
                setMessage("");
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "Enter" &&
                isTextareaFocused &&
                message &&
                !isDisabled &&
                !isLoading
            ) {
                onSend(message);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [message, onSend, isDisabled, isLoading, isTextareaFocused]);

    return (
        <div
            className={
                "min-h-12 bg-background rounded-xl w-full flex p-2 gap-default_spacing_lg"
            }
        >
            <textarea
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
                onChange={(e) => setMessage(e.target.value)}
                rows={
                    message.length > 30
                        ? Math.floor((message.length / 35) | 1)
                        : 1
                }
                placeholder={"Type message..."}
                value={message}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                className={
                    "outline-0 bg-background flex-1 border-0 rounded-xl resize-none p-2 text-sm"
                }
            />
            <button
                disabled={isDisabled || isLoading}
                className={"p-2 text-primary rounded-full"}
                onClick={handleSend}
            >
                <Send />
            </button>
        </div>
    );
};

export default ChatInput;
