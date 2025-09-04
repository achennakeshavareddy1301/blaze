import { inngest } from "./client";
import { createAgent, gemini, createTool, createNetwork,type Tool } from '@inngest/agent-kit';
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";
import { z } from "zod";
import { PROMPT } from "@/prompt";
import { lastAssistantMessage } from "./utils";
import prisma from "@/lib/db";
interface Agentstate{
  summary: string;
  files: {[path: string]:string}
}
export const CodeAgentfunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox", async () => {
      const sandbox = await Sandbox.create("blaze-nextjs-test-2");
      return sandbox.sandboxId;
    });

    const CodeAgent = createAgent<Agentstate>({
      name: 'CodeAgent',
      description: "An expert coding agent that can write next.js code in a sandboxed environment",
      system: PROMPT,
      model: gemini({ model: 'gemini-2.5-flash' }),
      tools: [
        createTool({
          name: 'terminal',
          description: 'use the terminal to run commands',
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run('terminal', async () => {
              const buffers = { stdout: '', stderr: '' };
              try {
                const sandbox = await getSandbox(sandboxId);
                if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found.`);
                await sandbox.commands.run(command, {
                  onStdout: (data) => { buffers.stdout += data; },
                  onStderr: (data) => { buffers.stderr += data; }
                });
                return { output: buffers.stdout || buffers.stderr || 'No output' };
              } catch (error) {
                console.error('Error running command:', error);
                return { output: buffers.stdout || buffers.stderr || 'Command failed' };
              }
            });
          }
        }),
        createTool({
          name: 'createOrUpdateFile', // fixed typo
          description: 'create or update a file in the sandbox',
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              }),
            ),
          }),
          handler: async ({ files }, { step, network }:Tool.Options<Agentstate>) => {
            const newFiles = await step?.run('create-or-update-file', async () => {
              try {
                const updateFiles = network.state.data.files || {};
                const sandbox = await getSandbox(sandboxId);
                if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found.`);
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  updateFiles[file.path] = file.content;
                }
                return updateFiles;
              } catch (error) {
                console.error('Error creating or updating file:', error);
                throw error;
              }
            });
            if (typeof newFiles === 'object') {
              network.state.data.files = newFiles;
            }
          }
        }),
        createTool({
          name: "readFiles",
          description: "Read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step }) => {
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found.`);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return JSON.stringify(contents, null, 2);
              } catch (e) {
                return `Error reading files: ${e}`;
              }
            });
          }
        })
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const assistantMessageContent = lastAssistantMessage(result);
          if (assistantMessageContent && network) {
            if (assistantMessageContent.includes("<task_summary>")) {
              network.state.data.summary = assistantMessageContent;
            }
          }
          return result;
        },
      },
    });

    const network = createNetwork({
      name: "coding-agent-network",
      agents: [CodeAgent],
      maxIter: 15,
      router: async ({ network }) => {
        const summary = network.state.data.summary;
        if (summary) {
          return;
        }
        return CodeAgent;
      }
    });

    const result = await network.run(event.data.value);
    const isError=!result.state.data.summary || Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      if (!sandbox) throw new Error(`Sandbox ${sandboxId} not found.`);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });
    await step.run("save-result", async ()=>{
      if (isError) {
        return await prisma.message.create({
          data: {
            projectId: event.data.projectId,
            content: "Error: No summary or files generated.",
            role: "ASSISTANT",
            type: "ERROR",
          },
        });
      }

      // Create message first
      const message = await prisma.message.create({
        data: {
          projectId: event.data.projectId,
          content: result.state.data.summary,
          role: "ASSISTANT",
          type: "RESULT",
        }
      });

      // Then create fragment with the message ID
      await prisma.fragment.create({
        data: {
          content: result.state.data.summary,
          title: "Fragment",
          files: result.state.data.files,
          sandboxUrl: sandboxUrl,
          messageId: message.id,
        }
      });

      return message;
    });

    return {
      url: sandboxUrl,
      files: result.state.data.files ?? {},
      summary: result.state.data.summary ?? "",
    }

  },
);