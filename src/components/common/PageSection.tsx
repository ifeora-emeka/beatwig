import React from "react";

type Props = {
    Icon: any;
    heading: string;
    children: any;
};

export default function PageSection({ heading, Icon, children }: Props) {
    return (
        <section className={"flex flex-col gap-default_spacing"}>
            <h3 className="text-muted md:text-lg flex gap-3 px-default_spacing md:px-0 text-center">
                <Icon size={25} />
                {heading}
            </h3>
            <div className={"flex flex-col gap-default_spacing"}>
                {children}
            </div>
        </section>
    );
}
