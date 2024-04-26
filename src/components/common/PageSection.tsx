import React from "react";

type Props = {
    Icon:any;
    heading: string;
    children: any;
}

export default function PageSection ({ heading, Icon, children }:Props) {
    return <section className={'flex flex-col gap-default_spacing'}>
        <h3 className="text-muted md:text-lg flex gap-3 px-default_spacing_lg md:px-0">
            <Icon />
            <span>{heading}</span>
        </h3>
        <div className={'flex flex-col gap-default_spacing'}>
            {children}
        </div>
    </section>
}

