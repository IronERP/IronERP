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

import {Intent} from "@/lib/etc/utils";
import {ReactElement} from "react";

export type BoolCallback = () => boolean;
export type SetIsVisibleCallback = (arg0: boolean) => void;

export interface ConfirmDialogProps {
    title: string;
    message: string;
    intent: Intent;
    confirmButtonText: string;
    cancelButtonText: string;
    icon: ReactElement | null;
    isVisible: boolean;
    onConfirm?: BoolCallback | null;
    onCancel?: BoolCallback | null;
    setIsVisible: SetIsVisibleCallback;
}

export default function ConfirmDialog(props: ConfirmDialogProps)
{
    const confirm = () => {
        props.setIsVisible(false);
        if(props.onConfirm != null)
            props?.onConfirm();
    }
    
    const cancel = () => {
        props.setIsVisible(false);
        if(props.onCancel != null)
            props?.onCancel();
    }
    
    if(!props.isVisible) return <></>;
    
    return <>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-75 z-40"></div>
        <div
            className="size-full fixed top-20 start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
            role="dialog" aria-labelledby="hs-basic-modal-label">
            <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 dark:text-white">
                            {props.title}
                        </h3>
                        <button type="button"
                                onClick={cancel}
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto flex items-center">
                        <div className={`size-12 inline-flex accent-${props.intent} text-${props.intent} rounded-full p-2 me-4`}>
                            {props.icon}
                        </div>
                        <p className="mt-1 text-gray-800 text-lg inline-flex">
                            {props.message}
                        </p>
                    </div>
                    <div
                        className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button" onClick={cancel} className="button">
                            {props.cancelButtonText}
                        </button>
                        <button type="button" onClick={confirm} className={`button intent-${props.intent}`}>
                            {props.confirmButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}