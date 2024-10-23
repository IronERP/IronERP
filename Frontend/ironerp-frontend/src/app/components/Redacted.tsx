"use client";

/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

import {useState} from "react";
import {EyeSlashIcon, EyeIcon} from "@heroicons/react/16/solid";

export default function Redacted({ content }: { content: string}) {
    const [ isShown, setIsShown ] = useState(false);
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