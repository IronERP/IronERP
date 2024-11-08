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

import {ModelSchema} from "@/lib/apiClient/SchemaClient";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import RedactedField from "@/app/components/RedactedField";

export type SetStateCallback = (value: object) => void;

export interface EntityEditorRef {
    validateForm: () => boolean;
}

function EntityEditor(
    { isLoading, schema, values, setValues, mode, onStateChanged }: 
    {
        isLoading: boolean,
        schema: ModelSchema | null,
        values: any | null,
        setValues: SetStateCallback, 
        mode: 'new' | 'edit',
        onStateChanged?: (state: boolean) => void | null 
    },
    ref: React.Ref<EntityEditorRef>
) {
    const [ isChanged, setIsChanged ] = useState<boolean>(false);
    const [ originalState, setOriginalState ] = useState<string | null>(null);
    const [ errors, setErrors ] = useState<string[]>([]);
    
    useEffect(() => {
        setOriginalState(JSON.stringify(values));
    }, []);
    
    useEffect(() => {
        if(!isOriginalState()) setIsChanged(true);
        else setIsChanged(false);
        if(onStateChanged != null)
            onStateChanged(isChanged);
    }, [ values ]);

    const isOriginalState = () => originalState === JSON.stringify(values);
    
    const validateForm = () => {
        const errs: string[] = [];
        
        let ret = true;
        schema?.fields.map(field => {
            console.log("Checking field ", field.name)
            if(field.required && (values[field.name.toLowerCase()] == null || values[field.name.toLowerCase()] == undefined || values[field.name.toLowerCase()] == ""))
            {
                errs.push(`Field '${field.name}' is required`);
                ret = false;
            }
        })
        
        setErrors(errs);
        return ret;
    }
    
    useImperativeHandle(ref, () => ({ validateForm }))
    
    if(schema != null) {
        return <>
            { (errors.length > 0)? <> {errors.map(err => <div className="bg-red-100 border border-red-500 rounded px-4 py-2 text-red-800">{err}</div>)}</>: <></ >}
            
                {schema?.fields.map((field) => <>
                <div>
                    <div className="input-group">
                        { ((!field.secret && !field.redacted) || mode == 'new')? <>
                            <span className="label">                                
                                {field.label? field.label : field.name}
                                {field.required? <><span className="text-red-500 ms-1 font-black">*</span></> : <></>}
                            </span>
                            <input onChange={ e => setValues({ ...values, [field.name.toLowerCase()]: e.target.value })} value={values[field.name.toLowerCase()]} disabled={(field.name.toLowerCase() == "id" || isLoading)} type="text"/>
                        </> : <>
                            {field.secret? <>
                                <span className="label">
                                    {field.label? field.label : field.name}
                                    {field.required? <><span className="text-red-500 ms-1 font-black">*</span></> : <></>}
                                </span>
                                <input value={values[field.name.toLowerCase()]} type="password" />
                            </> : <></>}
                            {field.redacted ? <><RedactedField isRequired={field.required} label={field.label? field.label : field.name} item={values[field.name.toLowerCase()]} callback={(value) => { setValues({ ...values, [field.name.toLowerCase()]: value }) }} /></> : <></>}
                        </>}
                    </div>
                </div>
            </>)}
        </>
    }
    else {
        return <>Loading...</>
    }
}

export default forwardRef(EntityEditor);