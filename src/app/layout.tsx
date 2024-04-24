import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

const font = Poppins({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Beatwig",
    description: "#1 online community. Watch live sports and stream movies",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="select-none">
            <body className={font.className}>
                <SpeedInsights />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
