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
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/16/solid";

export type RedactedFieldCallback = (value: string) => void;

export default function RedactedField({ label, item, callback, isRequired }: { label: string, item: string, callback: RedactedFieldCallback, isRequired?: boolean })
{
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    return <div className="w-full">
        <label htmlFor="hs-trailing-button-add-on-with-leading-and-trailing" className="sr-only">Label</label>
        <div className="flex rounded-lg shadow-sm">
            <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm dark:bg-neutral-700 dark:border-neutral-700">
                <span className="text-sm text-gray-500 dark:text-neutral-400">
                    {label}
                    {isRequired? <><span className="text-red-500 ms-1 font-black">*</span></> : <></>}
                </span>
            </span>
            <input disabled={!isVisible} onChange={ e => callback(e.target.value) } type={ isVisible? "text" : "password" } value={ item } id="hs-trailing-button-add-on-with-leading-and-trailing" name="hs-trailing-button-add-on-with-leading-and-trailing" className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
            <button type="button" onClick={() => setIsVisible(!isVisible)} className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                { isVisible? <><EyeSlashIcon className="size-5" /></> : <><EyeIcon className="size-5" /></>}                
            </button>
        </div>
    </div>;
}