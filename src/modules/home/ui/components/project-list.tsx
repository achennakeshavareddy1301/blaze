"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useTRPC } from "@/trpc/routers/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export const ProjectList = () => {
    const trpc = useTRPC();
    const user = useUser();

    // Fetch projects using useQuery
    const { data: projects, isLoading, error } = useQuery(
        trpc.projects.getMany.queryOptions()
    );

    // Debugging logs
    console.log("User object:", user);
    console.log("User ID:", user?.user?.id);
    console.log("Fetched projects:", projects);
    console.log("Is loading:", isLoading);
    console.log("Error:", error);

    return (
        <div className="flex flex-col gap-y-6 border p-8 rounded-xl dark:bg-sidebar bg-white w-full">
            <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
            
            {/* Handle loading state */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">Loading projects...</p>
                </div>
            )}

            {/* Handle error state */}
            {error && (
                <div className="flex items-center justify-center py-12">
                    <p className="text-red-500">
                        Failed to load projects. Please try again later.
                    </p>
                </div>
            )}

            {/* Handle empty projects */}
            {!isLoading && projects?.length === 0 && (
                <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">
                        No projects found. Create a new project to get started!
                    </p>
                </div>
            )}

            {/* Render projects */}
            {projects && projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <Button
                            key={project.id}
                            variant="outline"
                            className="h-auto p-0 overflow-hidden hover:shadow-md transition-shadow"
                            asChild
                        >
                            <Link href={`/projects/${project.id}`} className="block w-full">
                                <div className="flex items-center gap-x-4 p-4 w-full">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src="/logo.svg"
                                            alt="Project Logo"
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold truncate">
                                            {project.title || "Untitled Project"}
                                        </h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            ID: {project.id}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};