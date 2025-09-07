import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { inngest } from "@/inngest/client";
import { ProjectsRouter } from "@/modules/projects/server/procedures";
import { messagesRouter } from "@/modules/messages/server/procedures";

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input }) => {
      await inngest.send({
        name: "test/hello.world",
        data: { value: input.value },
      });
      return { success: true };
    }),
  createai: baseProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `hello ${input.text}`,
    })),
  projects: ProjectsRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;