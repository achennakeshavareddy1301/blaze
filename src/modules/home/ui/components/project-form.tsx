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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import {  
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {PROJECT_TEMPLATES} from "@/app/(home)/constants";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Message cannot be empty" })
    .max(5000, { message: "Message is too long" }),
});
export const ProjectForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: "" },
  });

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }



        toast.error(error.message);
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value,
    });
  };

  const onSelect = (content: string) => {
    form.setValue("value", content, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  return (
    <>
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
      <Form {...form}>
        
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border rounded-lg p-3 sm:p-4 md:p-6 bg-sidebar dark:bg-sidebar transition-all shadow-md w-full",
            isFocused && "ring-2 ring-primary"
          )}
        >
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary">
            Create a New Project
          </h2>
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
                    minRows={3}
                    maxRows={6}
                    placeholder="Enter your project details..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    className="w-full resize-none border rounded-md p-2 sm:p-3 bg-muted text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-3 sm:gap-0">
            <kbd className="pointer-events-none inline-flex h-5 sm:h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 sm:px-2 font-mono text-xs font-medium text-muted-foreground order-2 sm:order-1">
              <span>⌘</span>
              <span>Enter</span>
            </kbd>
            <Button
              type="submit"
              variant="primary"
              disabled={isButtonDisabled}
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors w-full sm:w-auto order-1 sm:order-2"
            >
              {isPending ? (
                <Loader2Icon className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <ArrowUpIcon className="h-4 sm:h-5 w-4 sm:w-5" />
                  Submit
                </span>
              )}
            </Button>
          </div>
        </form>
        
        {/* Project Templates */}
        <div className="flex flex-wrap mt-2 text-xs text-muted-foreground max-w-full">
          {PROJECT_TEMPLATES.map((template) => (
            <Button 
              key={template.title} 
              variant="ghost" 
              size="sm" 
              className="m-0.5 sm:m-1 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3" 
              onClick={() => onSelect(template.prompt)}
            >
              {template.emoji} {template.title}
            </Button>
          ))}
        </div>
      </Form>
    </div>
    </>
  );
};
