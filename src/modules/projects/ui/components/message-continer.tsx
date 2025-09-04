"use client";
import React from "react";
import { useTRPC } from "@/trpc/routers/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { FC, useRef } from "react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect } from "react";
import { lastAssistantMessage } from "@/inngest/utils";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";
interface Props {
  projectId: string;
  activeFragment:Fragment|null;
  setActiveFragment:(fragment:Fragment |null )=>void;

}

type Message = {
  id: string;
  role: "USER" | "ASSISTANT" | "SYSTEM"; // match your enum casing
  content: string;
  fragment: Fragment | null;              // <- was string | null
  createdAt?: string | Date;
  type: "RESULT" | "ERROR";               // align with MessageType
};

export const MessageContainer: FC<Props> = ({ projectId, setActiveFragment, activeFragment }) => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId }, { refetchInterval: 5000 })
  );

  const lastMessage = messages[messages.length - 1];
  const isLastMessagerUser = lastMessage?.role === "USER";

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="pt-2 pr-1">
              {messages.map((message: Message) => (
                <MessageCard
                  key={message.id}
                  role={message.role as any}
                  content={message.content}
                  fragment={message.fragment} // <- pass Fragment object (or null)
                  createdAt={message.createdAt ? new Date(message.createdAt) : new Date()}
                  isActiveFragment={activeFragment?.id === message.fragment?.id}
                  onFragmentClick={() => setActiveFragment(message.fragment ?? null)} // <- pass object
                  type={message.type as any}
                />
              ))}
              {isLastMessagerUser && <MessageLoading />}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="p-3 pt-1 relative">
            <div className="absolute-top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background pointer-events-none" />
            <MessageForm projectId={projectId} />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </div>
  );
};


