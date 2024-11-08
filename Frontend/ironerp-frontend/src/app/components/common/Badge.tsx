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

import css from './Badge.module.css';
import {classList} from "@/lib/etc/utils";
import {Icon} from "@blueprintjs/core";

export interface BadgeProps {
    // The color intent
    intent: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "default";
    // The main text
    text: string;
    
    // Optional second text shown in the other half of the badge
    secondText?: string | undefined;
    
    // Optional icon
    icon?: BlueprintIcons_16Id | undefined;
}

export default function Badge(props: BadgeProps) {
    let classes: string[] = [ css.badge ];
    let intentClass: string = "";

    switch(props.intent) {
        case "primary":
            intentClass = css.primary;
            break;
        case "secondary":
            intentClass = css.secondary;
            break;
        case "success":
            intentClass = css.success;
            break;
        case "warning":
            intentClass = css.warning;
            break;
        case "danger":
            intentClass = css.danger;
            break;
    }
    
    classes.push(intentClass);
    
    if(props.secondText != undefined) classes.push(css.hasAddon);
    
    return <>
        <div className="inline-block mb-2 me-2">
            <div className={classList(classes)}>
                {props.icon != undefined? <Icon icon={props.icon} className="me-2" /> : <></>}
                {props.text}
            </div>
            {props.secondText != undefined? <>
                <div className={classList([css.addon, intentClass])}>
                    {props.secondText}
                </div>
            </> : <></>}
        </div>
    </>;
}