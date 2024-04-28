import Image from "next/image";

type Props = {
    avatar_url: string;
    name: string;
    role: string;
};

export default function PersonCard({ avatar_url, name, role }: Props) {
    return (
        <div
            className={
                "p-default_spacing rounded-lg bg-hover flex flex-col gap-default_spacing min-w-[160px] text-white"
            }
        >
            <div className={"h-40 rounded-lg relative overflow-hidden"}>
                <Image
                    src={avatar_url || "/assets/img/avatar.webp"}
                    alt={name}
                    fill
                    className={"absolute"}
                />
            </div>
            <div className={"flex flex-col"}>
                <h5 className={"text-sm truncate"}>{name}</h5>
                <p className={"text-muted text-sm"}>as {role}</p>
            </div>
        </div>
    );
}
