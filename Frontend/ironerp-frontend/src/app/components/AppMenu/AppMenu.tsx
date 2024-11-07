import {Squares2X2Icon} from "@heroicons/react/24/outline";
import {useState} from "react";
import AppIcon from "@/app/components/AppMenu/AppIcon";

export default function AppMenu() {
    
    const [ isShown, setIsShown ] = useState<boolean>(false);
    
    const toggleShown = () => setIsShown(!isShown);
    
    return <>
        {/* Menubar Button */}
        <a className="nav-link" onClick={toggleShown} title="App Menu">
            <Squares2X2Icon className="size-6 inline"/>
        </a>
        
        {/* Popup */}
        {isShown? <>
            <div
                className="absolute z-50 bg-white top-20 border-slate-200 border rounded-xl shadow-lg p-4 min-w-[400px]">
                {/* Popup Title*/}
                <div
                    className="bg-gradient-to-b from-slate-200 to-slate-300 -mx-4 -mt-4 rounded-t-xl p-4 text-slate-700 font-black text-xl text-center">
                    App Menu
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                    {/* App Icon */}
                    <AppIcon color="sky" title="CRM" icon="people"/>
                    <AppIcon color="emerald" title="Accounting" icon="book"/>

                </div>
            </div>
        </> : <></>}
    </>;
}