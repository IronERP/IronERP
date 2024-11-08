import React, {ReactNode} from "react";
import {Icon} from "@blueprintjs/core";
import {BlueprintIcons_16Id} from "@blueprintjs/icons/lib/esnext/generated/16px/blueprint-icons-16";

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