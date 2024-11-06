import { Popcorn } from "lucide-react";
import PageSection from "@/components/common/PageSection";
import {
    EachResult,
    EachResultLoading,
} from "@/components/common/search-popup/EachSearchResults";

export default function SearchContinueWatching() {
    return (
        <>
            <div className="bg-card rounded-xl p-default_spacing shadow-md">
                <PageSection Icon={Popcorn} heading={"Continue watching"}>
                    <EachResultLoading />
                    <EachResult />
                </PageSection>
            </div>
        </>
    );
}
