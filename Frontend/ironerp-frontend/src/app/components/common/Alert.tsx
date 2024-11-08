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