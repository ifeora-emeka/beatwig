import HomeHeader from "@/components/common/HomeHeader";
import React from "react";
import Container from "@/components/common/Container";

export default function PageContainer({ children }: any) {
    return (
        <div className="flex justify-center">
            <Container>
                <div className="flex flex-col gap-default_spacing_lg md:py-5 md:mb-0 mb-5">
                    <HomeHeader />
                    <main className="flex flex-col gap-default_spacing_xl">
                        {children}
                    </main>
                </div>
            </Container>
        </div>
    );
}


