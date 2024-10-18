"use client";

import {ReactNode, useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon, CheckIcon} from "@heroicons/react/16/solid";

export type WizardPage = {
    title: string;
    children: ReactNode;
    canContinue: boolean;
    checkError: BoolCallback;
}

export type BoolCallback = () => string | null;

export default function Wizard({ title, pages }: { title: string, pages: WizardPage[] }) {
    const [ activePage, setActivePage ] = useState(0);
    const [ error, setError ] = useState<string | null>(null);
    
    const advancePage = (current: number) => {
        const currentPage = pages[current];
        const error = currentPage.checkError();
        if(error == null && current <= pages.length - 1) {
            setActivePage(current + 1);
            setError(null);
        }
        else {
            setError(error);
        }
    }
    
    const goBackPage = (current: number) => {
        if(current - 1 >= 0) {
            setActivePage(current - 1);
            setError(null);
        }        
    }
    
    if(pages.length < activePage) throw new Error("Active page index is higher than the number of pages");
    
    return <>
        <div className="border border-slate-100 shadow w-full p-4 rounded-md">
            <ul className="relative flex flex-row gap-x-2 mx-auto">
                {pages.map((page, i) => {
                    return <>
                        <li className="shrink basis-0 flex-1 group">
                            <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                            <span
                                className={`size-7 flex justify-center items-center shrink-0 font-medium text-gray-800 rounded-full bg-gray-100 ${i < activePage ? "bg-emerald-500 text-white" : ""} ${i == activePage ? "bg-sky-500 text-white" : ""} `}>
                                {i + 1}
                            </span>
                                <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
                            </div>
                            <div className="mt-3">
                            <span
                                className={`block text-sm text-gray-800 ${i == activePage ? "font-bold" : "font-medium"}`}>
                                {page.title}
                            </span>
                            </div>
                        </li>
                    </>
                })}
            </ul>
        </div>


        <div className="mt-4">
            {error != null? <>
                <div className="border bg-red-100 border-red-400 p-2 rounded text-red-800 mb-2">
                    {error}
                </div>
            </> : <></>}
            
            <div>
                {pages[activePage].children}
            </div>
        </div>

        <div className="mt-4 columns-2">
            <div>
                <button type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600"
                        onClick={() => goBackPage(activePage)}
                        disabled={activePage <= 0}>
                    <ArrowLeftIcon className="size-4" /> Previous
                </button>
            </div>

            <div className="text-right">
                {activePage < pages.length - 1? <>
                    <button type="button"
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-white border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            onClick={() => advancePage(activePage)}>
                        Next <ArrowRightIcon className="size-4"/>
                    </button>
                </> : <>
                    <button type="button"
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                        Finish <CheckIcon className="size-4"/>
                    </button>
                </>}
            </div>
        </div>
    </>
}