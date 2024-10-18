"use client";

import {BookOpenIcon, LinkIcon} from "@heroicons/react/16/solid";
import {LinkSlashIcon} from "@heroicons/react/24/outline";
import {Drawer} from "@blueprintjs/core";
import {GlobeAltIcon} from "@heroicons/react/24/outline";
import Wizard, {WizardPage} from "@/app/components/Wizard";
import {useState} from "react";
import DataSourceCard from "@/app/components/datasource/dataSourceCard";
import {PostgresIcon, GrafanaIcon, MsSqlIcon} from "@/app/components/icons";
import {match} from "ts-pattern";
import {
    GrafanaCloudConfigurator, MsSqlConfigurator,
    PostgresConfigurator,
    RestApiConfigurator
} from "@/app/components/datasource/dataSourceConfigurators";

export default function DataSourcesPage() {
    const [ selectedSourceType, setSelectedSourceType ] = useState<string | null>(null);
    
    const wizardPages: WizardPage[] = [
        {
            title: "Select a Datasource",
            children: <>
                <h2 className="text-2xl font-black mb-2">Featured</h2>

                <div className="columns-4 gap-4">
                    <DataSourceCard name="REST API" description="Connect to a JSON REST API" icon={<GlobeAltIcon/>} isSelected={selectedSourceType == 'restapi'} onClick={() => { setSelectedSourceType('restapi') }} />
                    <DataSourceCard name="PostgreSQL" description="Connect to PostgreSQL" icon={<PostgresIcon />} isSelected={selectedSourceType == 'postgres'} onClick={() => { setSelectedSourceType('postgres') }}/>
                    <DataSourceCard name="Grafana Cloud" description="Get metrics from Grafana Cloud" icon={<GrafanaIcon />} isSelected={selectedSourceType == 'grafanacloud'} onClick={() => { setSelectedSourceType('grafanacloud') }}/>
                    <DataSourceCard name="SQL Server" description="Connect to an SQL Server Database" icon={<MsSqlIcon />} isSelected={selectedSourceType == 'sqlserver'} onClick={() => { setSelectedSourceType('sqlserver') }}/>
                </div>

                <h2 className="text-2xl font-black mb-2 mt-6">All</h2>
                <span className="text-xl text-bold text-slate-500">More connection options coming soon!</span>
            </>,
            canContinue: true,
            checkError: () => selectedSourceType == null ? "Please select a data source first" : null
        },
        {
            title: "Configure Datasource",
            children: match(selectedSourceType)
                .with('restapi', () => <RestApiConfigurator />)
                .with('postgres', () => <PostgresConfigurator />)
                .with('grafanacloud', () => <GrafanaCloudConfigurator />)
                .with('sqlserver', () => <MsSqlConfigurator />)
                .otherwise(() => <>That's weird</>),
            canContinue: true,
            checkError: () => null
        },
        {
            title: "Test",
            children: <></>,
            canContinue: true,
            checkError: () => null
        }
    ];


    return <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Data
                            Sources</h2>
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                Connect IronERP to external data sources
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="hidden sm:block">
                            <button type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <BookOpenIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"/> Learn More
                            </button>
                        </span>

                        <span className="sm:ml-3">
                            <a href=""
                               className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Connect a Data Source
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div className="mx-auto w-1/3 mt-8">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden p-4 text-center">
                                <LinkSlashIcon className="size-48 mx-auto stroke-slate-200"/>
                                <span className="text-3xl mt-4 font-black text-slate-400 block">No Connections</span>
                                <span className="text-slate-400 block mt-2">You don't have any data source connections yet.</span>

                                <div className="columns-2 gap-0 px-20 mt-4">
                                    <a className="w-full py-3 font-black px-4 me-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        <LinkIcon className="size-4"/> Connect a Data Source
                                    </a>
                                    <a href="https://ironerp.org/docs/Engine/Settings/data-sources"
                                       className="w-full py-3 px-4 ms-2 inline-flex justify-center items-center gap-x-2 text-sm font-black rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                        <BookOpenIcon className="size-4"/> Read the Docs
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <Drawer isOpen={true} icon="data-connection" title="Connect a Data Source">

            <div className="p-4">
                <Wizard title="Connect to a DataSource" pages={wizardPages} />
            </div>
        </Drawer>
    </>
        ;
}