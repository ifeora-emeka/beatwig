import PageSection from "@/components/common/PageSection";
import { HistoryIcon, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchHistory({
    setKeyword,
}: {
    setKeyword: (e: string) => void;
}) {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        // fetch search history from local storageHistory
        const searchHistory = localStorage.getItem("searchHistory") || "";
        const history = searchHistory.split(",").filter(Boolean);
        setHistory(history);
    }, []);

    if (history.length == 0) {
        return null;
    }

    return (
        <>
            <div className="bg-card rounded-xl p-default_spacing shadow-md">
                <PageSection
                    Icon={HistoryIcon}
                    heading={"Search history"}
                    rightHeadingComp={
                        <button className="text-primary flex">
                            Clear <Trash className="ml-2 h-5 w-5" />
                        </button>
                    }
                >
                    <div>
                        {history.map((text, index) => {
                            return (
                                <EachSearchResult
                                    key={index}
                                    text={text}
                                    onClick={() => setKeyword(text)}
                                />
                            );
                        })}
                    </div>
                </PageSection>
            </div>
        </>
    );
}

const EachSearchResult = ({
    text,
    onClick,
}: {
    text: string;
    onClick: () => void;
}) => {
    return (
        <>
            <div
                className={
                    "rounded-xl hover:bg-hover flex gap-default_spacing p-default_spacing cursor-pointer hover:shadow-md"
                }
                onClick={onClick}
            >
                <Search />
                <span>{text}</span>
            </div>
        </>
    );
};
