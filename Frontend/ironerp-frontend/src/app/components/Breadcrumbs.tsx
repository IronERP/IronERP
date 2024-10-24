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

import {ReactElement} from "react";
import {ChevronRightIcon, CubeTransparentIcon} from "@heroicons/react/24/solid";

export interface BreadcrumbItem {
    name: string;
    icon?: ReactElement | null;
    href?: string | null;
    current: boolean;
}

export default function Breadcrumbs( { items }: { items: BreadcrumbItem[] }) {
    return <div className="border-y border-gray-200">
        <ol className="flex mx-auto max-w-7xl px-8 items-center whitespace-nowrap p-2">

            {items.map((item) => {
                return <>{item.current? <>
                        <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate"
                            aria-current="page">
                            {item.name}
                        </li>
                    </> : <>
                        <li className="inline-flex items-center">
                            <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                               href={item.href}>
                                {item.icon}
                                {item.name}
                            </a>
                            <ChevronRightIcon className="shrink-0 mx-2 size-4 text-gray-400"/>
                        </li>
                </>
                }</>
            })}
        </ol>
    </div>;
}