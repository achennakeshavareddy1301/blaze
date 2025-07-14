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
