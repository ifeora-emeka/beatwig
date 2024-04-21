import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function FootballComments({}: Props) {
    return (
        <div className="bg-card lg:rounded-lg p-default_spacing h-full w-full">
            <Tabs defaultValue="account" className="md:w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Discussion</TabsTrigger>
                    <TabsTrigger value="password">Replies</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    Make changes to your account here.
                </TabsContent>
                <TabsContent value="password">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
}
