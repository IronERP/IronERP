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
import Button from "@/app/components/common/Button";
import Badge from "@/app/components/common/Badge";
import PageHeader from "@/app/components/common/PageHeader";
import PageContainer from "@/app/components/common/PageContainer";
import { IronERPClient as Client, SimpleModelSpec } from "@ironerp/client";

export default function Entities() {
    const [items, setItems] = useState<SimpleModelSpec[]>([]);
    
    const [ error, setError ] = useState<Error | null>(null);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
        setItems([]);

        Client.models.listModels()
            .then(items => setItems(items))
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">

                {items.map(item => <>
                    <tr>
                        <td>
                            <a className="text-sky-600 dark:text-sky-400 font-bold" href={`/entities/${item.name}`}>{item.name}</a>
                        </td>
                        {item.isGenerated? <>
                            <td className="text-end">
                                <Tooltip content="This is a model defined by an installed app. Internal models can't be directly edited.">
                                    <Badge intent="secondary" text="internal model" icon="help" />
                                </Tooltip>
                            </td>
                        </> : <>
                            <td className="text-end">
                                <Button label="Edit" icon="edit" intent="primary" className="me-2" size="sm" />                                
                                <Button label="Delete" icon="delete" intent="danger" size="sm" />
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
    
    const headerButtons = <>
        <Button label="Refresh" intent="default" icon="refresh" onClick={loadData} className="me-2" />
        <Button label="New Model" intent="primary" icon="plus" />
    </>;

    return (
        <>
            <PageHeader title="Models" breadcrumbItems={breadcrumbs} buttons={headerButtons} />
            
            <PageContainer>
                {body}
            </PageContainer>
        </>
    );
}
