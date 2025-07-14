"use client"
import { useTRPC } from "@/trpc/routers/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useEffect } from "react";
export const Client = () => {
    const trpc=useTRPC();
    const { data } = useSuspenseQuery(trpc.createai.queryOptions({ text: "Hello" }));
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};