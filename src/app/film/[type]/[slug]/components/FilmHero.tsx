import { Badge } from "@/components/ui/badge";
import { BiBookmark, BiPlay } from "react-icons/bi";


export default function FilmHero() {
    return <div
        className={
            "bg-black/50 p-default_spacing flex md:flex-row flex-col gap-default_spacing_lg rounded-lg"
        }
    >
        <div className={"flex gap-default_spacing_lg md:justify-start justify-center"}>
            <div
                className={"h-[17rem] w-52 rounded-lg bg-card"}
            />
        </div>
        <div className={"flex gap-default_spacing_lg flex-col"}>
            <div className={"flex flex-col gap-1"}>
                <div
                    className={
                        "flex items-center gap-default_spacing text-xs"
                    }
                >
                    <div
                        className={
                            "border px-3 py-1 rounded-sm"
                        }
                    >
                        PG-13
                    </div>
                    <div>2024-04-19 (NG)</div>
                </div>
                <h1
                    className={"text-3xl"}
                >
                    {`Rebel Moon — Part Two: The Scargiver (2024)`}
                </h1>
                <div className={"flex gap-default_spacing"}>
                    <Badge className={"text-white"}>
                        Science Fiction
                    </Badge>
                    <Badge className={"text-white"}>
                        Action
                    </Badge>
                    <Badge className={"text-white"}>
                        Drama
                    </Badge>
                </div>
            </div>

            <div
                className={
                    "flex gap-default_spacing items-center"
                }
            >
                <button
                    className={
                        "rounded-full bg-primary text-white text-xl h-10 w-10 flex items-center justify-center"
                    }
                >
                    <BiBookmark />
                </button>
                <button
                    className={"flex items-center"}
                    role={"button"}
                >
                    <BiPlay size={25} />
                    <span>Watch Now</span>
                </button>
            </div>
            <div className={"flex flex-col"}>
                <h3>Overview</h3>
                <p className={"text-sm"}>
                    The rebels gear up for battle against
                    the ruthless forces of the Motherworld
                    as unbreakable bonds are forged, heroes
                    emerge — and legends are made.
                </p>
            </div>
        </div>
    </div>
}

