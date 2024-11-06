import React, {ReactNode} from "react";
import {Icon} from "@blueprintjs/core";
import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";

export default function AppIcon({ title, color, icon }: { title: string, color: string, icon: BlueprintIcons_16Id }) {
    return <>
        <div className="hover:shadow-md p-2 -m-2 rounded-lg hover:cursor-pointer">
            <div
                className={`block bg-gradient-to-b from-${color}-600 to-${color}-700 text-white rounded-xl text-center content-center h-20 font-black text-2xl shadow-md`}>
                <Icon icon={icon} size={32} />
            </div>
            <div className="font-semibold text-center mt-2">{title}</div>
        </div>
    </>;
}