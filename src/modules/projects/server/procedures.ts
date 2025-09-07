// src/trpc/routers/projects.ts
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { z } from 'zod';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { generateSlug } from 'random-word-slugs';
import { TRPCError } from '@trpc/server';

export const ProjectsRouter = createTRPCRouter({

  getMany: protectedProcedure
  .query(async ({ ctx }) => {
    return prisma.project.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: { createdAt: 'asc' },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string().min(1, { message: 'id is required' }) }))
    .query(async ({ input,ctx }) => {
      const project = await prisma.project.findUnique({
        where: { id: input.id, userId: ctx.auth.userId },
      });
      if (!project) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'project not found' });
      }
      return project;
    }),
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: 'Message cannot be empty' }),
      }),
    )
    .mutation(async ({ input,ctx}) => {
      const createdProject = await prisma.project.create({
        data: {
          userId: ctx.auth.userId,

          name: generateSlug(2, { format: 'kebab' }),
          description: '',
          messages: {
            create: {
              content: input.value,
              role: 'USER',
              type: 'RESULT',
            },
          },
        },
      });

      await inngest.send({
        name: 'code-agent/run',
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});