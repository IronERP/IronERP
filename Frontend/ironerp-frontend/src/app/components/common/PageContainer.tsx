import React from "react";

type Props = {
    children?: React.ReactNode
}

export default function PageContainer({ children }: Props) {
    return <>
        <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden dark:bg-bg-dark dark:border-slate-800 text-white">
                                <div className="p-4 space-y-3">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>;
}