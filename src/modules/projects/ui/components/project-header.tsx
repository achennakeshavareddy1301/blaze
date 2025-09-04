"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/routers/client";

import {
  ChevronDownIcon,
  SunMoonIcon,
  ChevronLeftIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface Props {
  projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const name = project?.name ?? "Project";

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-sm">
      <div className="flex items-center gap-3">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Project menu"
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg focus-visible:ring-0 hover:bg-gray-100 dark:hover:bg-gray-800 hover:opacity-90 transition-all"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                priority
                className="shrink-0"
              />
              <span className="ml-2 font-bold text-xl text-gray-900 dark:text-gray-100">
                {name}
              </span>
              <ChevronDownIcon
                className={`size-5 ml-1 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-2"
              >
                <ChevronLeftIcon className="size-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                <span>Back to projects</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-gray-700" />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-2">
                <SunMoonIcon className="size-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                <span>Theme</span>
                <ChevronDownIcon className="size-4 ml-auto text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  side="right"
                  align="start"
                  sideOffset={4}
                  className="w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
                >
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme} // FIX: setTheme directly!
                  >
                    <DropdownMenuRadioItem
                      value="light"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="dark"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="system"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Optionally, add more section to the right in the future */}
    </header>
  );
};