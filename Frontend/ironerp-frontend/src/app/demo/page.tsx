"use client";

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