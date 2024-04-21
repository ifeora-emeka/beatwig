import React from "react";

type Props = {
    children: any;
};

export default function Container({ children }: Props) {
    return (
        <div className="md:min-w-[699px] md:max-w-[699px] w-full">
            {children}
        </div>
    );
}

export const ContainerLg = ({ children }: any) => {
    return (
        <div className="lg:px-default_spacing xl:min-w-[1200px] xl:max-w-[1200px] w-full">
            {children}
        </div>
    );
};
