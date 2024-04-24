import BrandLogo from "@/components/common/BrandLogo";
import { BiLoaderAlt } from "react-icons/bi";

export default function AppLoading() {
    return (
        <div
            className={
                "fixed top-0 right-0 left-0 bottom-0 bg-card flex items-center justify-center"
            }
            style={{ zIndex: 500 }}
        >
            <div
                className={"flex flex-col gap-default_spacing_lg items-center"}
            >
                <BrandLogo size={70} />
                <BiLoaderAlt className={"animate-spin text-muted text-xl"} />
            </div>
        </div>
    );
}
