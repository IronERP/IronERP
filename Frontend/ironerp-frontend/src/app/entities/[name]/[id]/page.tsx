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

import Breadcrumbs, {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {HomeIcon, InboxArrowDownIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";
import {PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import FullscreenLoader from "@/app/components/FullscreenLoader";
import Redacted from "@/app/components/Redacted";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import {Intent} from "@/lib/etc/utils";
import {useRouter} from "next/navigation";
import _ from "lodash";

export default function EditPage({ params }: { params: { id: string, name: string } }) {
    const [ item, setItem ] = useState<any | null>(null);
    const [ schema, setSchema ] = useState<ModelSchema | null>(null);
    
    const [ columns, setColumns ] = useState<number>(2);
    const [ displayType, setDisplayType ] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        SchemaClient.LoadGenericObject(params.name, params.id)
            .then(setItem)
            .catch(console.error);
        
        SchemaClient.LoadSchema(params.name)
            .then(setSchema)
            .catch(console.error);
    }, []);
    
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
            name: item?.name ?? "Loading...",
            current: true
        }
    ];
    
    const [ deleteDialogShown, setDeleteDialogShown] = useState<boolean>(false);
    
    const onDeleteConfirm = () => {
        SchemaClient.DeleteGenericObject(params.name, params.id)
            .then(res => {
                if(res) router.push(`/entities/${params.name}`);
                else alert("Something didn't work");
            })
            .catch(console.error);
    }
    
    if(item == null || schema == null) return <FullscreenLoader />;
    
    return <>
        <ConfirmDialog title="Are you sure?" message={`Do you really want to delete the ${params.name} "${item?.name}"?`} intent={Intent.DANGER} confirmButtonText="Delete" cancelButtonText="Cancel" icon={<TrashIcon />} isVisible={deleteDialogShown} setIsVisible={setDeleteDialogShown} onConfirm={onDeleteConfirm} />
        
        <header className="bg-white shadow">
            <Breadcrumbs items={breadcrumbs}/>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {params.name}: <span className="font-bold">{item?.name}</span>
                        </h2>
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <span>ID: {params.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="sm:ml-3">
                                <a href={`/entities/${params.name}/${params.id}/edit`}
                                   className="button intent-primary">
                                    <PencilIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-4"/> Edit
                                </a>
                            </span>

                        <span className="sm:ml-3">
                                <button type="button" onClick={() => setDeleteDialogShown(true)}
                                        className="button intent-danger">
                                    <TrashIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-4"/> Delete 
                                </button>
                            </span>
                    </div>
                </div>
            </div>
        </header>
        <main>
            {/*Experimental!*/}
            {/*<input type="number" value={columns} onChange={e => setColumns(e.target.value)}/>*/}
            {/*<input type="checkbox" value={displayType} onChange={() => setDisplayType(!displayType)} />*/}
            
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden">
                                <div className="p-4 space-y-3">
                                    <dl className={`grid grid-cols-${columns} gap-4`}>
                                        {schema.fields.filter(f => item[_.camelCase(f.name)] != null && item[_.camelCase(f.name)] != "").map(field => {
                                            return <>
                                                {displayType? <>
                                                    <div>
                                                        <dt className="font-black text-lg">{field.label}</dt>
                                                        <dd>
                                                            {field.secret? <><span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium bg-gray-800 text-white"><LockClosedIcon className="size-3 text-white"/> Secret</span></> : <></>}
                                                            {field.redacted? <><Redacted content={item[_.camelCase(field.name)]} /></>:<></>}
                                                            {(!field.secret && !field.redacted)? <>{item[_.camelCase(field.name)]}</>:<></>}
                                                        </dd>
                                                    </div>
                                                </> : <>
                                                    <dt className="font-black text-lg">{field.name}</dt>
                                                    <dd>
                                                        {item[field.name.toLowerCase()]}
                                                    </dd>
                                                </>}
                                            </>
                                        })}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
}