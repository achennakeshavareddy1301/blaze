import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Hint } from "@/components/hint";
interface Props {
    data: Fragment;
};
export const FragmentWeb = ({data}:Props) => {
    const [copied, setCopied]=useState(false);
    const [fragmentKey, setFragmentKey]=useState(0);

    const onRefresh = () => {
        setFragmentKey(prevKey => prevKey + 1);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl );
        setCopied(true)
        setTimeout(() => setCopied(false), 2000);
    };
     // Reset after
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center gap-x-2 p-2 border-b">
                <Button variant="outline" size="sm" className="px-2 py-1 text-sm" onClick={onRefresh}>
                    <RefreshCcwIcon/>
                </Button>

                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!data.sandboxUrl|| copied}>
                    <span className="truncate">{data.sandboxUrl}</span>
                </Button>

                    <Button variant="outline" size="sm" disabled={!data.sandboxUrl} onClick={()=>{
                        if(data.sandboxUrl) return;
                        window.open(data.sandboxUrl,"_blank");
                        <ExternalLinkIcon/>
                    }}>
                    </Button>

                    
 
                
            </div>        
            <iframe key={fragmentKey} className="flex flex-col w-full h-full border-0" src={data.sandboxUrl} sandbox="allow-scripts allow-same-origin allow-forms allow-popups"/>
        </div>
    );
};
               