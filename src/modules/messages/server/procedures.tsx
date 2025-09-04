import { createTRPCRouter ,baseProcedure } from "@/trpc/init";
import { z } from "zod";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { Fragment } from "@/generated/prisma";
export const messagesRouter = createTRPCRouter({
    getMany:baseProcedure
    .input(z.object({
        projectId:z.string().min(1,{message: "Project ID cannot be empty"})
       }),
       )

        .query(async ({input}) => {
            const messages = await prisma.message.findMany({
                where:{
                    projectId:input.projectId,
                },
                include:{
                    fragment:true,
                },
                orderBy: {
                    createdAt: "asc",
                },

            });
            return messages;
        }), 
    create: baseProcedure
        .input(z.object({
            value: z.string().min(1,{message: "Message cannot be empty"}),
            projectId:z.string().min(1,{message: "Project ID cannot be empty"})
        }),
        )
        .mutation(async ({ input }) => {
            const createdMessage = await prisma.message.create({
                data: {
                    projectId: input.projectId,
                    content: input.value,
                    role: "USER",
                    type: "RESULT",

                },
            });
            await inngest.send({
                name:"code-agent/run",
                data: {
                    value:input.value,
                    projectId: input.projectId,
                },

                    

            });
            return createdMessage;

        }),
});
