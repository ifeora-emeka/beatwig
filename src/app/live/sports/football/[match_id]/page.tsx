import { ContainerLg } from "@/components/common/Container";
import React from "react";
import FootballComments from "./FootballComments";
import FootballPlayer from "./FootballPlayer";
import { baseUrl } from "@/constants";
import axios from "axios";

export default async function page(props: any) {
    console.log(props.params.match_id);
    const res = await axios(`${baseUrl}/api/public/sports/football`, {
        method: "POST",
        data: {
            match_id: props.params.match_id,
        },
    });

    console.log(res.data);

    let details = res.data.matchDetails;

    return (
        <div className="flex justify-center lg:py-default_spacing min-h-[100vh] max-h-[100vh]">
            <ContainerLg>
                <div className="flex lg:gap-default_spacing lg:flex-row flex-col">
                    <div className="flex-1 flex flex-col gap-default_spacing">
                        <FootballPlayer data={details} />
                    </div>
                    <div className="lg:w-[400px] lg:h-[calc(100vh-12px-12px)] h-[calc(100vh-200px-2.5rem)] flex flex-col gap-default_spacing">
                        <FootballComments />
                    </div>
                </div>
            </ContainerLg>
        </div>
    );
}
