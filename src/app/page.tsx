<<<<<<< HEAD
import { getQueryClient ,trpc } from "@/trpc/server"
import { dehydrate,HydrationBoundary} from "@tanstack/react-query"
import { queryOptions } from "@tanstack/react-query"
import { Client } from "@/app/Client"
import { Suspense } from "react"
const Page =  async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.createai.queryOptions({text: "Hello"}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Client/>
      </Suspense>
    </HydrationBoundary>

  )
}

export default Page
=======
import React from 'react';

const Page = () => {
  return (
    <div>Hello</div>

  );
}

export default Page;
>>>>>>> 1881ef88225ed82b5c584f1152c85625c9c971e9
