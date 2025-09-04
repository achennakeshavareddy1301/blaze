"use client";
import { Fragment,MessageRole,MessageType } from "@/generated/prisma";
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

interface UserMessageProps{
    content:string;
}
const UserMessage=({content}:UserMessageProps) => {
    return (
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
                {content}
            </Card>
        </div>
    );
}
interface AssistantMessage{
    content:string;
    fragment: Fragment | null;
    createdAt:Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragmentId: string) => void;
    type:MessageType;

}
interface FragmentCardProps{
    fragment:Fragment|null;
    isActiveFragment:boolean;
    onFragmentClick:(fragment:Fragment) => void;
}
const FragmentCard=({fragment,isActiveFragment,onFragmentClick}:FragmentCardProps) => {
    return(
        <button
          className={cn("flex items-start text-start gap-2 rounded-lg bg-muted w-fit hover:bg-accent transition-colors p-3",isActiveFragment && "bg-primary text-primary-foreground border-primary hover:bg-primary")}
            onClick={() => onFragmentClick(fragment)}
        >
            <Code2Icon className="size-4 mt-0.5" />
            <div className="flex flex-col flex-1">
             <span className="font-medium text-sm line-clamp-1">{fragment.title}</span>
             <span className="text-sm">preview</span>
            </div>
            <div className="flex items-center justify-center  mt-0.5">
                <ChevronRightIcon className="size-4" />
            </div>
        </button>
    );
}
const AssistantMessage=({
    content,
    fragment,
    isActiveFragment,
    onFragmentClick,
    type
}:AssistantMessage) => {
    return (
        <div className={cn("flex flex-col pb-4 px-2" ,type=="ERROR" && " text-red-500 dark:text-red-500")}>
            <div className="flex items-center  gap-2 pb-2 mb-2 border-b">
               <Image src="/logo.svg" alt="Blaze Logo" width={18} height={18} className="shirnk-0"/>
                <span className="text-sm font-medium">Blaze</span>
            </div>
            <div className="flex flex-col gap-y-4 ">

                <span>{content}</span>
                {fragment && type==="RESULT" && (
                    <FragmentCard
                        fragment={fragment}
                        isActiveFragment={isActiveFragment}
                        onFragmentClick={onFragmentClick}
                    />
                )}

            </div>
        </div>
    ); 

}

interface MessageCardProps {
    content:string;
    role:MessageRole;
    fragment: Fragment | null;
    createdAt:Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragmentId: string) => void;
    type:MessageType;
}
export const MessageCard=({
    content,
    role,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type
}: MessageCardProps) => {
    if (role === "ASSISTANT"){
        return (
            <AssistantMessage
                content={content}
                fragment={fragment}
                createdAt={createdAt}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
                type={type}
            />

        );
    }
    return(
        <UserMessage content={content} />
    )
}