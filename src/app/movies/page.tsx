import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { BiVideo } from "react-icons/bi";
import { Metadata } from "next";
import { appData } from "@/constants";



export default function Page() {
    return <>
        <div className={'flex justify-center'}>
            <PageContainer>
                <div className={'flex flex-col gap-default_spacing'}>
                    <PageSection Icon={BiVideo} heading={"Trending movies"}>
                        <h2>hi</h2>
                    </PageSection>
                    <PageSection Icon={BiVideo} heading={"Trending movies"}>
                    <h2>hi</h2>
                </PageSection>
                </div>
            </PageContainer>
        </div>
    </>
}

