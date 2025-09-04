// src/trpc/routers/projects.ts
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { z } from 'zod';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { generateSlug } from 'random-word-slugs';
import { TRPCError } from '@trpc/server';

export const ProjectsRouter = createTRPCRouter({

  getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      return prisma.message.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: 'asc' },
        include: { fragment: true },
      });
    }),
  getOne: baseProcedure
    .input(z.object({ id: z.string().min(1, { message: 'id is required' }) }))
    .query(async ({ input }) => {
      const project = await prisma.project.findUnique({
        where: { id: input.id },
      });
      if (!project) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'project not found' });
      }
      return project;
    }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: 'Message cannot be empty' }),
      }),
    )
    .mutation(async ({ input }) => {
      const createdProject = await prisma.project.create({
        data: {
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