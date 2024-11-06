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
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import {ArrowPathIcon, ChevronDownIcon, PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/20/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EyeSlashIcon, HomeIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import Redacted from "@/app/components/Redacted";
import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";
import {Cell, Column, Table2} from "@blueprintjs/table";
import {AnchorButton, Button, NonIdealState} from "@blueprintjs/core";
import {Layout} from "@blueprintjs/icons";
import _ from "lodash";

export default function EntityDetail({ params }: { params: { name: string } })
{
    const [ schema, setSchema ] = useState<ModelSchema | null>(null);
    const [ contents, setContents ] = useState<any | null>(null);
    const [ loadingTooLong, setLoadingTooLong ] = useState<boolean>(false);
    
    const identifierColumnNames = [ "id", "name", "label" ];
    
    useEffect(() => {
        SchemaClient.LoadSchema(params.name)
            .then(setSchema)
            .catch(console.error);

        SchemaClient.LoadGenericObjectList(params.name)
            .then(setContents)
            .catch(console.error);
    }, []);
    
    setTimeout(() => { setLoadingTooLong(true) }, 3000);
    
    if(schema == null || contents == null) return <>
        <div className="mx-auto max-w-7xl mt-5">
            <div
                className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                    <div className="flex justify-center">
                        <div className="animate-spin inline-block size-14 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                            role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>                        
                    </div>
                    <span className="text-2xl font-thin mt-5">Loading, please wait...</span>
                    { loadingTooLong? <><span className="mt-2">Still nothing? Try <span onClick={() => { window.location.reload() }} className="text-sky-600 hover:underline cursor-pointer">refreshing the page</span>.</span></> : <></>}
                </div>
            </div>
        </div>
    </>;
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            name: "Home",
            icon: <HomeIcon className="size-4 me-2"/>,
            href: "/",
            current: false
        },
        {
            name: "Models",
            icon: <CodeBracketSquareIcon className="size-4 me-2"/>,
            href: "/entities",
            current: false
        },
        {
            name: params.name,
            current: true
        }
    ];
    
    const tableCellRenderer = (lineIndex: number, columnIndex: number) => {
        if(contents.length >= lineIndex && schema.fields.length >= columnIndex) {
            const row = contents[lineIndex];
            const colField = schema.fields[columnIndex];
            
            if(colField.redacted) {
                return <Cell className="bg-slate-600 text-white text-center font-black"><EyeSlashIcon className="m-0 p-0 size-3 inline" /> REDACTED</Cell>
            }
            
            if (colField.secret) {
                return <Cell className="bg-slate-700 text-white text-center font-black"><LockClosedIcon className="m-0 p-0 size-3 inline" /> SECRET</Cell>
            }
            
            return <Cell interactive={true}>
                <a href={`/entities/${schema?.name}/${row["id"]}`} className="text-sky-700">{row[_.camelCase(colField.name)]}</a>
            </Cell>;
        }
        
        return <Cell>Error</Cell>;
    }

    return <>
        <header className="bg-white shadow">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{schema?.name}</h2>
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                {schema?.namespace}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="hidden sm:block">
                                <button type="button"
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <ArrowPathIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"/> Refresh
                                </button>
                            </span>

                        <span className="sm:ml-3">
                                <a href={`/entities/${schema?.name}/new`}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> New {schema?.name}
                                </a>
                            </span>

                        <Menu as="div" className="relative ml-3 sm:hidden">
                            <MenuButton
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                                More <ChevronDownIcon aria-hidden="true"
                                                      className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"/>
                            </MenuButton>

                            <MenuItems transition
                                       className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                <MenuItem>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">Edit</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">View</a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
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
                                {(contents.length > 0)? <>
                                    <Table2 numRows={contents.length}>
                                        {schema?.fields.map(field =>
                                            <Column name={field.name} cellRenderer={tableCellRenderer} />
                                        )}
                                    </Table2>
                                </> : <>
                                    <div className="py-4">
                                        <NonIdealState 
                                            icon="search" 
                                            title="Nothing Found" 
                                            description={`You don't have any instances of ${schema?.name} yet. You can go ahead and create one now.`}
                                            action={<AnchorButton href={`/entities/${schema?.name}/new`} outlined={true} text={`Create a new ${schema?.name}`} icon="plus" intent="primary"  />} 
                                            layout="horizontal"/>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>;
}