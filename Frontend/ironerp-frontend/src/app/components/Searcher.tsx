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

import {MutableRefObject, useEffect, useRef, useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

type MeiliSearchResult = {
    id: string;
    name: string;
    type: string;
}

type MeiliSearchResponse = {
    hits: MeiliSearchResult[];
    offset: number;
    limit: number;
    estimatedTotalHits: number;
    processingTimeMs: number;
    query: string;
}

export default function Searcher() {
    const [ resultsVisible, setResultsVisible ] = useState(false);
    const [ results, setResults ] = useState<MeiliSearchResponse | null>(null);
    
    const searchFieldRef : MutableRefObject<HTMLInputElement | null> = useRef(null);
    const dialogRef : MutableRefObject<HTMLDivElement | null> = useRef(null);
    
    useEffect(() => {
        const rect = searchFieldRef?.current?.getBoundingClientRect();
        const left = rect?.left ?? 0;
        if(dialogRef != null && dialogRef.current != null) {
            dialogRef.current.style.left = `${left}px`;
        }        
    }, []);
    
    const doSearch = (term: string) => {
        if(term.length < 3) return;
        
        // SearchClient.Search(term)
        //     .then(data => {
        //         setResults(data);
        //         setResultsVisible(true);
        //     })
        //     .catch(console.error);
        
        fetch(`http://localhost:7700/indexes/GlobalEntitySearchIndex/search`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer 3b8a32eaca494b6c1eb4224e60f57f81b1d773ea839650c4e30354666a068291"
            },
            body: JSON.stringify({
                q: term
            })
        })
        .then(res => res.json())
        .then(setResults)
        .catch(console.error);
    }
    
    const debounceBlur = () => {
        //setTimeout(() => setResultsVisible(false), 100);
    }
    
    return <>
        <input type="text" ref={searchFieldRef} className="search-input"
               placeholder="Search..." onChange={e => doSearch(e.target.value)}  onBlur={debounceBlur} onFocus={() => setResultsVisible(true)} />
        
        <div ref={dialogRef} className={`absolute w-80 top-20 right-96 bg-gradient-to-b from-slate-50 to-slate-100 rounded-md shadow-xl border border-slate-200 p-4 ${resultsVisible? "" : "hidden"}`}>
            <h4 className="text-xl font-bold">Search Results</h4>

            {(results != null)? <><span className="text-sm text-slate-400">Found {results.estimatedTotalHits} results in {results.processingTimeMs}ms</span></> : <></>}
            
            <span className="absolute top-2 right-2 text-slate-500 hover:text-slate-700" onClick={debounceBlur}><CloseIcon /></span>

            {(results != null && results.hits.length > 0? <>
                {(results.hits.map((v, i) => <>
                    <a href={`/entities/${v.type}/${v.id}/edit`} key={v.name} onClick={debounceBlur}>
                        <div className="bg-white rounded p-2 mt-2 shadow hover:shadow-md">
                            <h5 className="font-bold">{v.name}</h5>
                            <p className="mt-1 text-slate-400 text-sm">{v.type} (ID: {v.id})</p>
                        </div>
                    </a>
                </>))}
            </> : <>
                <span>No results</span>
            </>)}
            
        </div>
    </>;
}