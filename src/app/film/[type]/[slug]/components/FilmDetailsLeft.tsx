"use client";
import PageSection from "@/components/common/PageSection";
import { BiMovie, BiUser } from "react-icons/bi";
import PersonCard from "@/components/common/PersonCard";

export default function FilmDetailsLeft({ data }: any) {
    return (
        <div
            className={
                "md:min-w-[70%] md:max-w-[70%] p-default_spacing bg-card rounded-lg flex flex-col gap-default_spacing_xl"
            }
        >
            <PageSection Icon={BiUser} heading={"Cast members"}>
                <div
                    className={
                        "flex gap-default_spacing overflow-x-auto pb-default_spacing"
                    }
                >
                    {data?.people?.map((person: any) => {
                        return (
                            <PersonCard
                                key={crypto.randomUUID()}
                                avatar_url={person.image}
                                name={person.name}
                                role={person.role}
                            />
                        );
                    })}
                </div>
            </PageSection>
        </div>
    );
}
