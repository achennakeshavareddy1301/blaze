"use client";
import { useTRPC } from "@/trpc/routers/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
  const trpc = useTRPC();
  const [value, setValue] = useState("");

  const router = useRouter();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("message created!");
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={createProject.isPending}
        onClick={() => createProject.mutate({ value })}
      >
        submit
      </Button>
    </div>
  );
}