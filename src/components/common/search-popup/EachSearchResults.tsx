import PageSection from "@/components/common/PageSection";
import Link from "next/link";
import { ArrowUpRight, VideoIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface  Props  {
    Icon: any;
    heading: string;
}

export default function EachSearchResults({ heading, Icon}:Props) {
    return (
                <div className="bg-card rounded-xl p-default_spacing shadow-md">
                    <PageSection Icon={Icon} heading={heading} rightHeadingComp={
                        <Link href={"/"} className="text-primary flex">
                            Show all <ArrowUpRight className="ml-2" />
                        </Link>
                    }>
                        <div>
                            <EachResultLoading />
                            <EachResult />
                            <EachResult />
                            <EachResult />
                        </div>
                    </PageSection>
                </div>
    );
}

export const EachResult = () => {
    return <>
        <div
            className="bg-card p-default_spacing rounded-lg border-t hover:bg-hover flex gap-default_spacing hover:shadow-sm cursor-pointer">
            <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                <div
                    className="bg-[url(https://cdn.pixabay.com/photo/2016/01/22/08/20/film-1155439_640.jpg)] min-h-14 min-w-11 bg-cover bg-center rounded-md" />
                <div className="truncate">
                    <h5>The name of the movie</h5>
                    <small className="text-muted truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aliquam magnam fuga qui quam, harum iure molestias alias obcaecati deleniti facilis eius sunt, recusandae aperiam voluptate doloremque officia assumenda ipsa perferendis!</small>
                </div>
            </div>
            <div className="min-h-10 min-w-10"></div>
        </div>
    </>
}

export const EachResultLoading = () => {
    return <>
        <div className="bg-card p-default_spacing rounded-lg border-t flex gap-default_spacing">
            <div className="flex gap-default_spacing max-w-[90%] truncate flex-1">
                <Skeleton className="min-h-14 min-w-11 bg-cover bg-center rounded-md" />
                <div className="truncate w-full flex flex-col gap-default_spacing justify-center">
                    <h5>
                        <Skeleton className="h-3 w-[40%]" />
                    </h5>
                    <small className="text-muted truncate w-full">
                        <Skeleton className="p-1 w-[70%]" />
                    </small>
                </div>
            </div>
            <div className="min-h-10 min-w-10"></div>
        </div>
    </>
}

