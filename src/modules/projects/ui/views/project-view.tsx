"use client";
import React from "react";
import { useTRPC } from "@/trpc/routers/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense, useState } from "react";
import { MessageContainer } from "../components/message-continer";
import { Fragment } from "@/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "@/modules/projects/ui/components/fragment-web";
interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

  const trpc = useTRPC();


  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
          <Suspense fallback={<div>Loading project...</div>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<div>"Loading Message..."</div>}>
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={65} minSize={50}>
          {!!activeFragment && <FragmentWeb data={activeFragment}/>}

        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};