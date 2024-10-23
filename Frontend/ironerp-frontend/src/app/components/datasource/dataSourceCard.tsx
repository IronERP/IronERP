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

import {ReactElement, useState} from "react";

export type VoidCallback = () => void;

export default function DataSourceCard({ name, description, icon, isSelected, onClick }: { name: string, description: string, icon: ReactElement, isSelected: boolean, onClick: VoidCallback }) {
    return <>
        <div className={`border border-slate-200 shadow p-2 hover:shadow-md rounded cursor-pointer bg-white ${isSelected? "shadow-md shadow-sky-400 hover:shadow-md hover:shadow-sky-500" : ""}`} onClick={onClick}>
            <div className="grid grid-cols-5">
                <div className="col-span-1 content-center">
                    {icon}
                </div>
                <div className="col-span-4 ps-4">
                    <p className="text-lg font-bold">{name}</p>
                    <p className="text-slate-500">{description}</p>
                </div>
            </div>
        </div>
    </>;
}