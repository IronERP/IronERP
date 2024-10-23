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

import Wizard, {WizardPage} from "@/app/components/Wizard";
import {useState} from "react";
import {Checkbox} from "@blueprintjs/core";

export default function DemoPage() {
    
    const [ check, setCheck ] = useState(false);
    
    const pages: WizardPage[] = [
        {
            title: "Page 1",
            children: <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deleniti dolorum eius illum itaque 
                    nisi perferendis temporibus. Consectetur, distinctio doloremque enim eveniet expedita non quibusdam
                    rem repellendus repudiandae voluptates! Incidunt.</p>
                <Checkbox label="Is?" value={check? "on" : "off"} onChange={e => setCheck(e.target.value == "on")} />
            </>,
            canContinue: check,
            checkError: () => null
        },
        {
            title: "Page 2",
            children: <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deleniti dolorum eius illum itaque
                    nisi perferendis temporibus. Consectetur, distinctio doloremque enim eveniet expedita non quibusdam
                    rem repellendus repudiandae voluptates! Incidunt.</p>
            </>,
            canContinue: true,
            checkError: () => "That didn't work"
        },
        {
            title: "Page 3",
            children: <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deleniti dolorum eius illum itaque
                    nisi perferendis temporibus. Consectetur, distinctio doloremque enim eveniet expedita non quibusdam
                    rem repellendus repudiandae voluptates! Incidunt.</p>
            </>,
            canContinue: true,
            checkError: () => null
        }
    ];

    return <>
        <main>
            <div className="mx-auto w-1/3 mt-8">
                <Wizard title="Whizzard" pages={pages}/>
            </div>
        </main>
    </>

}