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

import {HomeIcon, InboxArrowDownIcon} from "@heroicons/react/16/solid";
import {useEffect, useRef, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import EntityEditor, {EntityEditorRef} from "@/app/components/entityEditor";
import {useRouter} from "next/navigation";
import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";

export default function NewEntityPage( { params }: { params: { name: string } }) {
    const [ item, setItem ] = useState<any | null>({});
    const [ schema, setSchema ] = useState<ModelSchema | null>(null);
    const [ isChanged, setIsChanged ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const router = useRouter();
    
    const editorRef = useRef<EntityEditorRef>(null);

    useEffect(() => {
        SchemaClient.LoadSchema(params.name)
            .then(setSchema)
            .catch(console.error);
    }, []);
    
    const handleSubmit = () => {
        setIsLoading(true);
        setError(null);
        if(editorRef.current?.validateForm()) {
            SchemaClient.PostGenericObject(params.name, item)
                .then(() => router.push(`/entities/${params.name}`))
                .catch(err => {
                    setError(err.message)
                    setIsLoading(false);
                });            
        } else {
            setIsLoading(false);
        }
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
            icon: <CodeBracketSquareIcon className="size-4 me-2"/>,
            href: "/entities",
            current: false
        },
        {
            name: params.name,
            icon: <CubeTransparentIcon className="size-4 me-2"/>,
            href: `/entities/${params.name}`,
            current: false
        },
        {
            name: `Create new ${params.name}`,
            current: true
        }
    ];
    
    return <>
        <header className="bg-white shadow">
            <Breadcrumbs items={breadcrumbs} />
            
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Create a new {params.name}</h2>

                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                {/*{schema?.namespace}*/}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="sm:ml-3">
                            {isLoading? <>
                                <button type="button" disabled
                                        className="inline-flex  disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed items-center rounded-md bg-white-600 border border-green-500 text-green-500 px-3 py-2 text-sm font-semibold shadow-sm hover:border-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <div
                                        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-green-400 rounded-full"
                                        role="status" aria-label="loading">                                        
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <span className="ms-2 text-green-400">Saving...</span>                                    
                                </button>
                            </> : <>
                                <button type="button" onClick={handleSubmit}
                                        className="inline-flex  disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed items-center rounded-md bg-white-600 border border-green-500 text-green-500 px-3 py-2 text-sm font-semibold shadow-sm hover:border-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <InboxArrowDownIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Save
                                </button>
                            </>}                            
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
                            {error != null? <><div className="bg-red-200 border border-red-600 text-red-800 rounded px-4 py-2 mb-4"><strong>Oh crud! Something went wrong: </strong>{error}</div></> : <></>}

                            <div className="border rounded-lg shadow overflow-hidden">
                                <div className="p-2 space-y-3">
                                    <EntityEditor isLoading={isLoading} schema={schema} values={item}
                                                  setValues={setItem} mode='new' onStateChanged={b => setIsChanged(b)}
                                                  ref={editorRef}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>;
}