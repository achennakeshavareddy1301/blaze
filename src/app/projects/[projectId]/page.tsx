import React from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ProjectView } from '@/modules/projects/ui/views/project-view';

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = await params;
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
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectView projectId={projectId} />
      </HydrationBoundary>
    </Suspense>
  );
} 