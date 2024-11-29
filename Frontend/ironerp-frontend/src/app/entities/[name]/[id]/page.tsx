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
import FullscreenLoader from "@/app/components/FullscreenLoader";
import Redacted from "@/app/components/Redacted";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import {Intent} from "@/lib/etc/utils";
import {useRouter} from "next/navigation";
import _ from "lodash";
import PageHeader from "@/app/components/common/PageHeader";
import Button from "@/app/components/common/Button";
import PageContainer from "@/app/components/common/PageContainer";

import { IronERPClient as Client, Schema } from "@ironerp/client";

export default function EditPage({ params }: { params: { id: string, name: string } }) {
    const [ item, setItem ] = useState<any | null>(null);
    const [ schema, setSchema ] = useState<Schema | null>(null);
    
    const [ columns, setColumns ] = useState<number>(2);
    const [ displayType, setDisplayType ] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        Client.models.getItem(params.name, params.id)
            .then(setItem)
            .catch(console.error);
        
        Client.models.getSchema(params.name)
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
        Client.models.deleteItem(params.name, params.id)
            .then(res => {
                if(res) router.push(`/entities/${params.name}`);
                else alert("Something didn't work");
            })
            .catch(console.error);
        return true;
    }
    
    if(item == null || schema == null) return <FullscreenLoader />;
    
    const headerButtons = <>
        <Button label="Edit" intent="primary" icon="edit" isAnchor={true} href={`/entities/${params.name}/${params.id}/edit`} className="me-2 inline-block" />
        <Button label="Delete" intent="danger" icon="trash" onClick={() => setDeleteDialogShown(true)} className="ms-2" />
    </>;
    
    return <>
        <ConfirmDialog title="Are you sure?" message={`Do you really want to delete the ${params.name} "${item?.name}"?`} intent={Intent.DANGER} confirmButtonText="Delete" cancelButtonText="Cancel" icon={<TrashIcon />} isVisible={deleteDialogShown} setIsVisible={setDeleteDialogShown} onConfirm={onDeleteConfirm} />
        
        <PageHeader title={item?.name} subtitle={`ID: ${params.id}`} breadcrumbItems={breadcrumbs} buttons={headerButtons} />

        <PageContainer>
            <dl className={`grid grid-cols-${columns} gap-4`}>
                {schema.fields.filter(f => item[_.camelCase(f.name)] != null && item[_.camelCase(f.name)] != "").map(field => {
                    return <>
                        {displayType ? <>
                            <div>
                                <dt className="font-black text-lg">{field.label}</dt>
                                <dd>
                                    {field.secret ? <><span
                                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium bg-gray-800 text-white"><LockClosedIcon
                                        className="size-3 text-white"/> Secret</span></> : <></>}
                                    {field.redacted ? <><Redacted content={item[_.camelCase(field.name)]}/></> : <></>}
                                    {(!field.secret && !field.redacted) ? <>{item[_.camelCase(field.name)]}</> : <></>}
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
        </PageContainer>
    </>
}