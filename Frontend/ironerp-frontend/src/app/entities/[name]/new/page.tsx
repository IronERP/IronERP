import {InboxArrowDownIcon} from "@heroicons/react/16/solid";

export default function NewEntityPage( { params }: { params: { name: string } }) {
    return <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create a new { params.name }</h2>
                        
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                            {/*{schema?.namespace}*/}
                            </div>
                        </div>
                    </div>
                
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="sm:ml-3">
                            <button type="button" className="inline-flex  disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed items-center rounded-md bg-white-600 border border-green-500 text-green-500 px-3 py-2 text-sm font-semibold shadow-sm hover:border-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <InboxArrowDownIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/> Save 
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    </>;
}