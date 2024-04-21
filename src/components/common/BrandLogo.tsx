import Image from "next/image";
import React from "react";

type Props = {
    size?: number;
};

export default function BrandLogo({ size }: Props) {
    let defaultSize = 20;
    return (
        <Image
            src={"/brand_prev_ui.png"}
            alt="brand"
            height={size || defaultSize}
            width={size || defaultSize}
        />
    );
}
