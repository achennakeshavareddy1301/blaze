import Image from "next/image";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
export default function Page() {
  return (
    <>
      <div className="flex flex-col max-w-5xl mx-auto w-full">
        <section className="space-y-6 py-[12vh] 2xl:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Blaze Logo"
                width={48}
                height={48}
                className="hidden md:block"
              />
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Blaze
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              AI-Powered Code Generation
            </h2>
            <p className="text-base max-w-2xl text-muted-foreground mb-6">
              Harness the power of artificial intelligence to transform your creative ideas into production-ready code instantly.
            </p>
          </div>
          <div className="max-w-3xl w-full mx-auto">
            <ProjectForm />
          </div>
        </section>
        <ProjectList /> 
      </div>
    </>
  );
}