"use client";

import {useEffect, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import {ArrowPathIcon, ChevronDownIcon, PlusIcon, TrashIcon} from "@heroicons/react/20/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import RedactedField from "@/app/components/RedactedField";
import {InboxArrowDownIcon} from "@heroicons/react/16/solid";

export default function EditPage({ params }: { params: { id: string, name: string } }) {
    const [ item, setItem ] = useState<any | null>(null);
    const [ schema, setSchema ] = useState<ModelSchema | null>(null);
    const [ isChanged, setIsChanged ] = useState<boolean>(false);
    const [ originalState, setOriginalState ] = useState<string | null>(null);
    
    useEffect(() => {
        SchemaClient.LoadGenericObject(params.name, params.id)
            .then(data => {
                setItem(data);
                setOriginalState(JSON.stringify(data));
            })
            .catch(console.error);
        
        SchemaClient.LoadSchema(params.name)
            .then(setSchema)
            .catch(console.error);
    }, []);
    
    useEffect(() => {
        console.log("Original state: ", originalState);
        console.log("Current state: ", JSON.stringify(item));
        
        if(!isOriginalState()) setIsChanged(true);
        else setIsChanged(false);
    }, [ item ])
    
    const isOriginalState = () => originalState === JSON.stringify(item);
    
    if(item != null) {
        return <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                {params.name}: <span className="font-bold">{item.name}</span>
                            </h2>
                            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    { isChanged? <><span className="inline-flex me-2 items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-yellow-500 text-yellow-500">Unsaved Changes</span></> : <></>}
                                    <span>ID: {params.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="sm:ml-3">
                                <button type="button"
                                        disabled={!isChanged}
                                        className="inline-flex  disabled:border-gray-300 disabled:text-gray-300 cursor-not-allowed items-center rounded-md bg-white-600 border border-green-500 text-green-500 px-3 py-2 text-sm font-semibold shadow-sm hover:border-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <InboxArrowDownIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Save 
                                </button>
                            </span>
                            
                            <span className="sm:ml-3">
                                <button type="button"
                                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <TrashIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Delete 
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
                                    <div className="p-2 space-y-3">
                                    {schema?.fields.map((field) => <>
                                            <div>
                                                <div className="flex rounded-lg shadow-sm">
                                                    { (!field.secret && !field.redacted)? <>
                                                        <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">{field.label? field.label : field.name}</span>
                                                        <input onChange={ e => setItem({ ...item, [field.name.toLowerCase()]: e.target.value })} value={item[field.name.toLowerCase()]} disabled={(field.name.toLowerCase() == "id")} type="text" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                                                    </> : <>
                                                        {field.secret? <>
                                                            <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">{field.label? field.label : field.name}</span>
                                                            <input value="Secret" type="password" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                                                        </> : <></>}
                                                        {field.redacted ? <><RedactedField label={field.label? field.label : field.name} item={item[field.name.toLowerCase()]} callback={(value) => { setItem({ ...item, [field.name.toLowerCase()]: value }) }} /></> : <></>}
                                                    </>}
                                                </div>
                                            </div>
                                        </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>;
    } else {
        return <h1>Loading...</h1>;
    }
}