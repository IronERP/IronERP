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
import {HomeIcon} from "@heroicons/react/16/solid";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";
import {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {useRouter} from "next/navigation";
import EntityEditor, {EntityEditorRef} from "@/app/components/entityEditor";
import Button from "@/app/components/common/Button";
import PageHeader, {BadgeProps} from "@/app/components/common/PageHeader";
import PageContainer from "@/app/components/common/PageContainer";
import Alert from "@/app/components/common/Alert";

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
        <Button label="Save" intent="success" icon="floppy-disk" disabled={!isChanged} onClick={submit} />
        <Button label="Delete" intent="danger" icon="trash" />
    </>;
    
    const unsavedBadge: BadgeProps = {
        text: "Unsaved Changes",
        intent: "warning",
        shown: isChanged
    }

    if (item != null) {
        return <>
            <PageHeader title={`${params.name}: ${item.name}`} subtitle={`ID: ${params.id}`}
                        breadcrumbItems={breadcrumbs} badge={unsavedBadge} buttons={headerButtons} />

            
            <PageContainer>
                { error != null? <Alert title="Oh snap! Something went wrong" content={error ?? ""} intent="danger" icon="error" /> : <></> }
                
                <EntityEditor isLoading={isLoading} schema={schema} values={item}
                              setValues={setItem} mode='edit'
                              onStateChanged={b => setIsChanged(b)}
                              ref={editorRef}/>
            </PageContainer>
        </>;
    } else {
        return <h1>Loading...</h1>;
    }
}