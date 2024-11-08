import React from "react";

type Props = {
    Icon: any;
    heading: string;
    children: any;
    rightHeadingComp?: any;
};

export default function PageSection({
    heading,
    Icon,
    children,
    rightHeadingComp,
}: Props) {
    return (
        <section className={"flex flex-col gap-default_spacing"}>
            <div className="flex justify-between">
                <h3 className="text-muted md:text-lg flex gap-3 px-default_spacing md:px-0 text-center items-center">
                    <Icon size={25} />
                    {heading}
                </h3>
                {rightHeadingComp}
            </div>
            <div className={"flex flex-col gap-default_spacing text-muted"}>
                {children}
            </div>
        </section>
    );
}
