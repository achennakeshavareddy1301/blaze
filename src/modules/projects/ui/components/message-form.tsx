"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { useTRPC } from "@/trpc/routers/client";
import { toast } from "sonner";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

interface Props {
  projectId: string;
}

const formSchema = z.object({
  value: z.string().min(1, { message: "Message cannot be empty" }).max(5000, { message: "Message is too long" }),
});

export const MessageForm = ({ projectId }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: "" },
  });

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        // Reset the form after successful mutation
        form.reset();
        // Invalidate the query to refetch messages
        queryClient.invalidateQueries(["messages", { projectId }]);
      },
      onError: (error) => {
        // Display an error toast if mutation fails
        toast.error(error.message);
      },
    })
  );

  const isPending = createMessage.isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createMessage.mutate({ projectId, ...data }))}
        className={cn(
          "relative border rounded-xl p-4 pt-1 bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "rounded-t-none"
        )}
      >
        <FormField
          name="value"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextareaAutosize
                  {...field}
                  disabled={isPending}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  minRows={2}
                  maxRows={8}
                  placeholder="Type your message here..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      form.handleSubmit((data) =>
                        createMessage.mutate({ projectId, ...data })
                      )();
                    }
                  }}
                  className="w-full resize-none border-0 bg-transparent text-sm focus:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 pt-2 justify-between items-end">
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span>⌘</span>
            <span>Enter</span>
          </kbd>
          <Button type="submit" disabled={isPending} className="h-8 w-8 p-0 rounded-full">
            {isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};