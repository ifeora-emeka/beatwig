import PageSection from "@/components/common/PageSection";
import { HistoryIcon, Search, Trash } from "lucide-react";
import { useState } from "react";

export default function SearchHistory() {
    const [show, setShow] = useState(false);
    return <>
        <div className="bg-card rounded-xl p-default_spacing shadow-md">
            <PageSection Icon={HistoryIcon} heading={"Search history"} rightHeadingComp={
                <button className="text-primary flex">
                    Clear <Trash className="ml-2 h-5 w-5" />
                </button>
            }>
                <div>
                    <EachSearchResult text={'From'} />
                    <EachSearchResult text={'Small vil'} />
                </div>
            </PageSection>
        </div>
    </>
}

const EachSearchResult = ({text}:{text:string;}) => {
    return <>
    <div className={'rounded-xl hover:bg-hover flex gap-default_spacing p-default_spacing cursor-pointer hover:shadow-md'}>
        <Search />
        <span>{text}</span>
    </div>
    </>
}
