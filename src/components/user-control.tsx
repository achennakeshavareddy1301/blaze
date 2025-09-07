"use client";
import React from "react";
import {dark} from "@clerk/themes";

import { UserButton } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
interface Props {
    showName?: boolean;
}

export const UserControl = ({ showName = false }: Props) => {

    const currentTheme = useCurrentTheme();
    return (
        <UserButton
            showName={showName}
            appearance={{
                elements: {

                    userButtonAvatarBox: "rounded-md! size-8!",
                    userButtonBox: "ronded-md! ",
                    userButtonTrigger: "hover:bg-secondary/50 transition-colors",
                    userButton: "h-8 px-2 gap-2",
                },
                baseTheme: currentTheme === "dark" ? dark : undefined,
                
            }}
        />
    );
};




            