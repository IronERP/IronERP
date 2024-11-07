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

import {useEffect, useRef, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import {TrashIcon} from "@heroicons/react/20/solid";
import {HomeIcon, InboxArrowDownIcon} from "@heroicons/react/16/solid";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";
import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {useRouter} from "next/navigation";
import EntityEditor, {EntityEditorRef} from "@/app/components/entityEditor";
import Button from "@/app/components/common/Button";
import PageHeader from "@/app/components/common/PageHeader";

export default function EditPage({ params }: { params: { id: string, name: string } }) {
    const [item, setItem] = useState<any | null>(null);
    const [schema, setSchema] = useState<ModelSchema | null>(null);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [originalState, setOriginalState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const editorRef = useRef<EntityEditorRef>(null);

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

        if (!isOriginalState()) setIsChanged(true);
        else setIsChanged(false);
    }, [item])

    const isOriginalState = () => originalState === JSON.stringify(item);

    const submit = () => {
        setIsLoading(true);
        setError(null);
        if (editorRef.current?.validateForm()) {
            SchemaClient.PutGenericObject(params.name, item)
                .then(() => router.push(`/entities/${params.name}/${params.id}`))
                .catch(console.error);
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
            name: item?.name,
            current: true
        }
    ];

    const headerButtons = <>

    </>;

    // <span className="sm:ml-3">
    //                                 <button type="button"
    //                                         disabled={!isChanged}
    //                                         onClick={submit}
    //                                         className="inline-flex  disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed items-center rounded-md bg-white-600 border border-green-500 text-green-500 px-3 py-2 text-sm font-semibold shadow-sm hover:border-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    //                                     <InboxArrowDownIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Save 
    //                                 </button>
    //                             </span>
    // 
    //                             <span className="sm:ml-3">
    //                                 <button type="button"
    //                                         className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    //                                     <TrashIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Delete 
    //                                 </button>
    //                             </span>

    if (item != null) {
        return <>
            <PageHeader title={`${params.name}: ${item.name}`} subtitle={`ID: ${params.id}`}
                        breadcrumbItems={breadcrumbs}/>

            <header className="bg-white shadow">
                <Breadcrumbs items={breadcrumbs}/>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-2xl leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                {params.name}: <span className="font-bold">{item.name}</span>
                            </h2>
                            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    {isChanged ? <><span
                                        className="inline-flex me-2 items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-yellow-500 text-yellow-500">Unsaved Changes</span></> : <></>}
                                    <span>ID: {params.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex lg:ml-4 lg:mt-0">

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
                                        <EntityEditor isLoading={isLoading} schema={schema} values={item}
                                                      setValues={setItem} mode='edit'
                                                      onStateChanged={b => setIsChanged(b)}
                                                      ref={editorRef}/>
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