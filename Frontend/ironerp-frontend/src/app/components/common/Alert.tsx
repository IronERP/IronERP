"use client";

import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";
import {Icon} from "@blueprintjs/core";
import {useState} from "react";

import css from './Alert.module.css';
import {classList} from "@/lib/etc/utils";

export interface AlertProps {
    title?: string | null;
    content: string;
    intent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
    icon?: BlueprintIcons_16Id | null;
    dismissable?: boolean;
}

export default function Alert(props: AlertProps) {
    const [ isOpen, setIsOpen ] = useState<boolean>(true);
    
    const classes: string[] = [ css.alert ];

    switch(props.intent) {
        case "primary":
            classes.push(css.primary);
            break;
        case "secondary":
            classes.push(css.secondary);
            break;
        case "success":
            classes.push(css.success);
            break;
        case "warning":
            classes.push(css.warning);
            break;
        case "danger":
            classes.push(css.danger);
            break;
        case "default":
            classes.push(css.default);
            break;
    }
    
    const close = () => setIsOpen(false);
    
    if(isOpen) {
        return <div className={classList(classes)}>
            {(props.title != null && props.title != "")? <div className={css.title}>
                {props.icon != null? <Icon icon={props.icon} className={css.icon} /> : <></>}
                {props.title}
                {props.dismissable? <>
                <span className="float-end cursor-pointer hover:text-gray-200" onClick={close}>
                    <Icon icon="cross" />
                </span>
                </>:<></>}
            </div> : <></>}

            {(props.icon != null && (props.title == null && (props.title ?? "" != "")))? <Icon icon={props.icon} className="me-2" /> : <></>}
            {props.content}
        </div>    
    }
    
    return <></>
}