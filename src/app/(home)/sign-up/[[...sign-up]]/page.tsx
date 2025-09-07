"use client";
import { SignUp } from '@clerk/nextjs'
import {dark} from "@clerk/themes";
import { useCurrentTheme } from '@/hooks/use-current-theme';
const Page=()=>{
    const theme = useCurrentTheme();
    return (
        <>
        <div className="flex flex-col max-w-3xl mx-auto w-full">
           <section className="space-y-6 pt-[20vh] 2xl:py-32">
                <div className="flex flex-col items-center text-center px-4">
                    <SignUp appearance={{
                        baseTheme: theme === "dark" ? dark : undefined,
                        elements: {
                            card: "shadow-md rounded-lg",
                            headerTitle: "text-2xl font-semibold",
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                            cardbox:"rounded-lg! shadow-nonr! border!"
                        }
                    }}/>
                </div>
            </section>
        </div>
        </>


    );

}
export default Page;