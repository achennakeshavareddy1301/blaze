"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessageContainer } from "../components/message-continer";
import { Fragment } from "@/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "@/modules/projects/ui/components/fragment-web";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"Preview" | "Code">("Preview");

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<div>Loading project...</div>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<div>Loading Message...</div>}>
            <MessageContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>

        <ResizableHandle className="hover:bg-primary transition-colors"  />

        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            defaultValue="Preview"
            className="h-full gap-y-0"
            value={tabState}
            onValueChange={(value) => setTabState(value as "Preview" | "Code")}
          >
            <div className="w-full border-b p-2 flex gap-x-2 items-center">
              <TabsList className="border p-0 h-8 rounded-md">
                <TabsTrigger value="Preview" className="rounded-md">
                  <EyeIcon />
                  <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger value="Code" className="rounded-md">
                  <CodeIcon />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild size="sm" variant="default">
                  <Link href="/pricing">
                    <CrownIcon />
                    Upgrade
                  </Link>
                </Button>
                <UserControl />
              </div>
            </div>

            {/* Render preview only when a fragment is selected */}
            <TabsContent value="Preview" className="h-full">
              {activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>

            <TabsContent value="Code" className="h-full">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
