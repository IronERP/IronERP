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

import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

import css from './ThemeToggle.module.css';

export default function ThemeToggle () {
    
    const [mount, setMount] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    
    useEffect(() => {
        setMount(true);
    }, []);
    
    return <>
        <div className="flex items-center me-2">
            <input type="checkbox" checked={currentTheme === "dark"} id="hs-large-switch" className={css.toggle} onChange={() => { console.log("poop"); setTheme(currentTheme === "dark" ? "light" : "dark") }} />
            <label htmlFor="hs-large-switch" className="text-sm text-gray-500 ms-3 dark:text-neutral-400 sr-only">Toggle color mode</label>
        </div>
    </>;
}