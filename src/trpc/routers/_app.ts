import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client'; // Adjust the import path as needed
import { ProjectsRouter } from '@/modules/projects/server/procedures';
import { messagesRouter } from '@/modules/messages/server/procedures';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        value: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await inngest.send({
        name: 'test/hello.world',
        data: {
          value: input.value,
        },
      });
      return { success: true };
    }), // <-- add comma and close mutation
  createai: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  projects: ProjectsRouter,
  messages: messagesRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;