"use client";

import {useEffect, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import {ArrowPathIcon, ChevronDownIcon, PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/20/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EyeSlashIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import Redacted from "@/app/components/Redacted";

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

    return <>
        <header className="bg-white shadow">
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
                                <button type="button"
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> New {schema?.name}
                                </button>
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
                                <table className="min-w-full divide-y divide-gray-200 table-auto">
                                    <thead>
                                    <tr className="divide-x divide-gray-200">
                                        {schema?.fields.map((field) => <>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                                {field.name}
                                            </th>
                                        </>)}
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase shrink">Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                    { contents.map((item: any) => <>
                                        <tr className="hover:bg-slate-50">
                                            {schema?.fields.map(field => <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    {identifierColumnNames.includes(field.name.toLowerCase())? <>
                                                        <a className="text-sky-600 font-bold" href={`/entities/${schema.name}/${item.id}`}>{item[field.name.toLowerCase()]}</a>
                                                    </>:<>
                                                        {(() => {
                                                            let content = item[field.name.toLowerCase()];

                                                            if(field.redacted) return <Redacted content={content} />;
                                                            if(field.secret) return <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium bg-gray-800 text-white"><LockClosedIcon className="size-3 text-white" /> Secret</span>;

                                                            return <>{content}</>;
                                                        })()}
                                                    </>}
                                                </td>
                                            </>)}
                                            <td className = "px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <a href={`/entities/${schema.name}/${item.id}/edit`} className = "py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 me-2 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                                    <PencilIcon className = "h-3 w-3 text-white" / > Edit
                                                </a>
    
                                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                                    <TrashIcon className="h-3 w-3 text-white"/> Delete
                                                </a>
                                            </td>
                                        </tr>
                                    </>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>;
}