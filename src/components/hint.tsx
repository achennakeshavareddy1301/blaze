"use client"
import { Tooltip, TooltipContent, TooltipTrigger,TooltipProvider } from "@/components/ui/tooltip";
interface HintPorps {
    childern: React.ReactNode;
    hint: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
};
export const Hint = ({childern,hint,side="top",align="center"}:HintPorps) => {
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {childern}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} >
                    <p>text</p>
                </TooltipContent>                    
            </Tooltip>
        </TooltipProvider>         
    )
};
