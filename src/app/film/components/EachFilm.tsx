import { BiPlay } from "react-icons/bi";
import { FilmData } from "@/types/film.types";

interface Props {
    data: FilmData;
}

export default function EachFilm({ data }: Props) {
    return (
        <article
            className={
                "p-default_spacing rounded-lg bg-card min-w-[200px] h-[300px] bg-center bg-cover bg-no-repeat relative overflow-hidden group"
            }
            style={{
                backgroundImage: `url(${data.poster})`,
            }}
        >
            <div
                className={
                    "absolute h-full w-full top-0 left-0 bottom-gradient flex justify-end p-2 text-white flex-col"
                }
            >
                <h5 className={"truncate"}>{data.title}</h5>
                <p className={"text-sm text-muted"}>{data.date || "-"}</p>
            </div>

            <div
                className={
                    "opacity-0 group-hover:opacity-100 smooth-transition group-hover:bg-black/50 z-20 absolute text-white w-full h-full left-0 top-0 flex justify-center items-center"
                }
            >
                <div
                    className={
                        "h-11 w-11 bg-primary rounded-full text-xl top-[50%] left-[50%] flex items-center justify-center"
                    }
                >
                    <BiPlay size={45} />
                </div>
            </div>
        </article>
    );
}
