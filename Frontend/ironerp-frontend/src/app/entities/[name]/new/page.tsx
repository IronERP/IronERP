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

import {HomeIcon} from "@heroicons/react/16/solid";
import {useEffect, useRef, useState} from "react";
import {ModelSchema, SchemaClient} from "@/lib/apiClient/SchemaClient";
import EntityEditor, {EntityEditorRef} from "@/app/components/entityEditor";
import {useRouter} from "next/navigation";
import {BreadcrumbItem} from "@/app/components/Breadcrumbs";
import {CodeBracketSquareIcon} from "@heroicons/react/24/outline";
import {CubeTransparentIcon} from "@heroicons/react/24/solid";
import Button from "@/app/components/common/Button";
import PageHeader from "@/app/components/common/PageHeader";
import PageContainer from "@/app/components/common/PageContainer";
import Alert from "@/app/components/common/Alert";

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
    
    const headerButtons = <>
        {isLoading? <>
            <Button label="Saving" intent="success" icon="circle" disabled={true} />
        </> : <>
            <Button label="Save" intent="success" icon="floppy-disk" onClick={handleSubmit}/>
        </>}
    </>;
    
    return <>
        <PageHeader title={`Create a new ${params.name}`} buttons={headerButtons} breadcrumbItems={breadcrumbs} />
        
        <PageContainer>
            {error != null? <><Alert title="Dang! Something went wrong." content={error} intent="danger" icon="error" /></>:<></>}            
            
            <EntityEditor 
                isLoading={isLoading} schema={schema} values={item}
                setValues={setItem} mode='new' onStateChanged={b => setIsChanged(b)}
                ref={editorRef}/>
        </PageContainer>
    </>;
}