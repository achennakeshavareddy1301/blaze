"use client"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    hint?: string; // Optional hint prop for future use
}

export const Hint = ({ children, side = "top", align = "center" }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p>text</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
