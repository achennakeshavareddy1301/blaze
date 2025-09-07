import React, { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ProjectView } from '@/modules/projects/ui/views/project-view';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ErrorBoundary } from 'react-error-boundary';

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = params; // Removed `await` here
  const queryClient = getQueryClient();

  // Prefetch the project
  await queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  // Prefetch the project messages
  await queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ErrorBoundary fallback={<div>Error loading project.</div>}>
            <ProjectView projectId={projectId} />
          </ErrorBoundary>
        </HydrationBoundary>
      </Suspense>
    </SidebarProvider>
  );
}