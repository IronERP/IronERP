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
import {EyeSlashIcon, HomeIcon, LockClosedIcon} from "@heroicons/react/16/solid";
import {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {Cell, Column, Table2} from "@blueprintjs/table";
import {AnchorButton, NonIdealState} from "@blueprintjs/core";
import _ from "lodash";
import PageHeader from "@/app/components/common/PageHeader";
import Button from "@/app/components/common/Button";
import {useTheme} from "next-themes";
import PageContainer from "@/app/components/common/PageContainer";
import { IronERPClient as Client, Schema } from "@ironerp/client";

export default function EntityDetail({ params }: { params: { name: string } })
{
    const [ schema, setSchema ] = useState<Schema | null>(null);
    const [ contents, setContents ] = useState<any | null>(null);
    const [ loadingTooLong, setLoadingTooLong ] = useState<boolean>(false);

    const { theme } = useTheme();
    
    useEffect(() => {
        Client.models.getSchema(params.name)
            .then(setSchema)
            .catch(console.error);

        Client.models.getItems(params.name)
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

    const headerButtons = <>
        <Button label="Refresh" intent="default" icon="refresh" />
        <Button label={`New ${schema?.name}`} intent="primary" icon="plus" isAnchor={true} href={`/entities/${schema?.name}/new`} />
    </>;
    
    return <>
        <PageHeader title={schema?.name} breadcrumbItems={breadcrumbs} subtitle={schema?.namespace} buttons={headerButtons} />
        
        <PageContainer>
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
        </PageContainer>
    </>;
}