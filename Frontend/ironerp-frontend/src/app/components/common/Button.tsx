import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";
import {Icon} from "@blueprintjs/core";

export interface ButtonProps {
    // Button Label
    label: string;
    
    // Button Color Intent
    intent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    
    // Button Icon
    icon?: BlueprintIcons_16Id | undefined;
}

export default function Button(props: ButtonProps) {
    return <button className={`button intent-${props.intent}`}>
        {props.icon != undefined? <Icon icon={props.icon} /> : <></>}
        {props.label}
    </button>
}