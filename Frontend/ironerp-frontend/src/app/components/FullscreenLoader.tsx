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

export default function FullscreenLoader() {
    return <>
        <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl w-1/4 mx-auto mt-8">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                    <div
                        className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                        role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <span className="text-blue-600 mt-4 text-xl">Loading, please wait...</span>
            </div>
        </div>
    </>;
}