import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";
import {Icon} from "@blueprintjs/core";

import css from './Button.module.css';
import {classList} from "@/lib/etc/utils";
import React from "react";

export type OnClickCallback = () => void;

export interface ButtonProps {
    // Button Label
    label: string;
    
    // Button Color Intent
    intent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
    
    // Button Icon
    icon?: BlueprintIcons_16Id | undefined;
    
    onClick?: OnClickCallback | undefined;
    
    href?: string | undefined;
    
    isAnchor?: boolean | undefined;
    
    className?: string | undefined;
    
    size?: "xs" | "sm"  | "lg";
    
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    let classes: string[] = [ css.button ];
    let iconSize = 16;
    
    if(props.className != undefined) classes.push(props.className);
    
    if(props.size != undefined) {
        switch(props.size) {
            case "xs":
                classes.push(css.xs);
                iconSize = 8;
                break;
            case "sm":
                classes.push(css.sm);
                iconSize = 12;
                break;
            case "lg":
                classes.push(css.lg);
                break;
        }
    }
    
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
    }
    
    const onClick = props.onClick ?? (() => {});
    
    if(!props.isAnchor) {
        return <button className={classList(classes)} onClick={onClick} disabled={props.disabled}>
            {props.icon != undefined? <Icon icon={props.icon} className={css.icon} size={iconSize} /> : <></>}
            {props.label}
        </button>
    }
    else {
        return <a className={classList(classes)} href={props.href ?? "#"}>
            {props.icon != undefined? <Icon icon={props.icon} className={css.icon} size={iconSize} /> : <></>}
            {props.label}
        </a>
    }    
}