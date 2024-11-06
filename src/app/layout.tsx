import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import "swiper/css";
import SearchPopup from "@/components/common/search-popup/SearchPopup";

const font = Poppins({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Beatwig",
    description: "#1 online community. Watch live sports and stream movie",
};

export default function RootLayout(props: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        children,
    } = props;
    
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="select-none text-muted bg-background"
        >
            <body className={font.className}>
                <Providers>
                    <SearchPopup />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
