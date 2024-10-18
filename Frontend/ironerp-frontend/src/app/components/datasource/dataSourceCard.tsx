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