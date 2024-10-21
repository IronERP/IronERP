import {ModelSchema} from "@/lib/apiClient/SchemaClient";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import RedactedField from "@/app/components/RedactedField";

export type SetStateCallback = (value: object) => void;

export interface EntityEditorRef {
    validateForm: () => boolean;
}

function EntityEditor(
    { schema, values, setValues, mode, onStateChanged }: 
    {
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
    const [ errors, setErrors ] = useState<any | null>(null);
    
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
        return true; 
    }
    
    useImperativeHandle(ref, () => ({ validateForm }))
    
    if(schema != null) {
        return <>
            {schema?.fields.map((field) => <>
                <div>
                    <div className="flex rounded-lg shadow-sm">
                        { ((!field.secret && !field.redacted) || mode == 'new')? <>
                            <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">                                
                                {field.label? field.label : field.name}
                                {field.required? <><span className="text-red-500 ms-1 font-black">*</span></> : <></>}
                            </span>
                            <input onChange={ e => setValues({ ...values, [field.name.toLowerCase()]: e.target.value })} value={values[field.name.toLowerCase()]} disabled={(field.name.toLowerCase() == "id")} type="text" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                        </> : <>
                            {field.secret? <>
                                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
                                    {field.label? field.label : field.name}
                                    {field.required? <><span className="text-red-500 ms-1 font-black">*</span></> : <></>}
                                </span>
                                <input value={values[field.name.toLowerCase()]} type="password" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
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