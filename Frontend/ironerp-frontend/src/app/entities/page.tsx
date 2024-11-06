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

import {useEffect, useState} from "react";
import {ModelClient, SimpleModelList} from "@/lib/apiClient/ModelClient";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {
    ArrowPathIcon,
    ChevronDownIcon,
    PencilIcon, PlusIcon, TrashIcon,
} from "@heroicons/react/20/solid";
import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {HomeIcon} from "@heroicons/react/16/solid";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {Popover, Tooltip} from "@blueprintjs/core";

export default function Entities() {
    const [items, setItems] = useState<SimpleModelList[]>([]);
    
    const [ error, setError ] = useState<Error | null>(null);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
        setItems([]);

        ModelClient.ListModels()
            .then((items) => setItems(items))
            .catch(setError);
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            name: "Home",
            icon: <HomeIcon className="size-4 me-2"/>,
            href: "/",
            current: false
        },
        {
            name: "Models",
            current: true
        }
    ];
    
    const body = error == null? <>
        {items.length > 0? <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr className="divide-x divide-gray-200">
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">

                {items.map(item => <>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            <a className="text-sky-600 font-bold" href={`/entities/${item.name}`}>{item.name}</a>
                        </td>
                        {item.isGenerated? <>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <Tooltip content="This is a model defined by an installed app. Internal models can't be directly edited.">
                                    <span
                                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-gray-500 text-gray-100 cursor-help">Internal Model</span>
                                </Tooltip>
                            </td>
                        </> : <>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button type="button"
                                        className="button intent-primary me-2">
                                    <PencilIcon className="h-3 w-3 text-white"/> Edit
                                </button>

                                <button type="button"
                                        className="button intent-danger">
                                    <TrashIcon className="h-3 w-3 text-white"/> Delete
                                </button>
                            </td>
                        </>}

                    </tr>
                </>)}
                </tbody>
            </table>
        </> : <>
            <div className="flex animate-pulse">
                <div className="m-2 w-full">
                    <ul className="m-5 space-y-3">
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                        <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    </ul>
                </div>
            </div>
        </>}
    </> : <>
        <div className="bg-red-50 border-s-4 border-red-500 p-4 m-5 dark:bg-red-800/30 rounded-lg shadow-md"
             role="alert" aria-labelledby="hs-bordered-red-style-label">
            <div className="flex">
                <div className="shrink-0">
                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                        </svg>
                    </span>
                </div>
                <div className="ms-3">
                    <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white">Could not load this resource</h3>
                    <p className="text-sm text-gray-700 dark:text-neutral-400">{ error.name }: { error.message }</p>
                </div>
            </div>
        </div>
    </>;

    return (
        <>
            <header className="bg-white shadow">
                <Breadcrumbs items={breadcrumbs} />
                
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Models</h2>
                        </div>

                        <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="hidden sm:block">
                                <button type="button" className="button intent-secondary" onClick={loadData}>
                                    <ArrowPathIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"/> Refresh
                                </button>
                            </span>

                            <span className="sm:ml-3">
                                <button type="button" className="button intent-primary">
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" /> New Model
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="border rounded-lg shadow overflow-hidden">
                                    {body}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
