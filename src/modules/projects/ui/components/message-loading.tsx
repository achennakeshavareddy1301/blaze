import Image from "next/image";
import { useState,useEffect } from "react";
import React from "react";
const ShimmerMessages=()=>{
    const messages=[
        "Loading...",
        "Thinking...",
        "Analyzing...",
        "Processing...",
        "Crafting response...",
        "Almost there...",
        "Optimizing...",
        "Adding final touches...",
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000); // Change message every 2 seconds
        return () => clearInterval(interval);
    }, [messages.length]);
    return (
        <div className="flex items-center gap-2" >
         
            <span className="text-base text-muted-forground animate-pluse">
                {messages[currentMessageIndex]}
            </span>
                
        </div>
    );

}
export const MessageLoading=()=>{
    return (
        <div className="flex flex-col group px-2 pb-4 ">
            <div className="flex items-center  gap-2 pl-2 mb-2">
                <Image 
                    src="/logo.svg" 
                    alt="Blaze Logo" 
                    width={18} 
                    height={18} 
                    className="shirnk-0"
                />
                <span className="text-sm font-medium">Blaze</span>
            </div>
            <div className="flex flex-col gap-y-4  animate-pulse">
                <ShimmerMessages/>
            </div>
        </div>


    )
}
