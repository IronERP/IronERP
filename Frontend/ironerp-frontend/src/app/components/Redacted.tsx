import {useState} from "react";
import {EyeSlashIcon, EyeIcon} from "@heroicons/react/16/solid";

export default function Redacted({ content }: { content: string}) {
    const [ isShown, setIsShown ] = useState(true);
    const redactedText = "Redacted";
    
    const toggle = () => setIsShown(!isShown);
    
    if(isShown) {
        return <>
            <span
                onClick={toggle}
                className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium border border-gray-800 text-gray-800">
                <EyeIcon className="size-3 text-gray-800"/> {content}
            </span>
        </>;
    } else {
        return <>
            <span
                onClick={toggle}
                className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium bg-gray-800 text-white">
                <EyeSlashIcon className="size-3 text-white"/> {redactedText}
            </span>
        </>;
    }
}