"use client";

import { jobInfo, userApplication } from "@/interfaces/interface";
import { useState } from "react";


export default function ApplicationCard({apps}: {apps: userApplication[]}) {
    
    const [items, setItems] = useState<userApplication[]>(apps.slice(0,5))


    function showMore() {
        setItems(apps);
    }
    return (
        <>
            {items.map((app: userApplication, index:number) => (
                <div className="card mt-3 flex-grow-1" key={index}>
                    <div className="card-body">
                        <h5 className="card-title text-primary">{app.job.title}</h5>
                        {
                        app.coverletter.length > 50 
                        ? <p className="card-text">Cover letter: {app.coverletter.substring(0,50)} . . .</p>
                        : <p className="card-text">Cover letter: {app.coverletter}</p>
                        }
                        
                    </div>
                </div>
            ))}
            {items.length !== apps.length && <p onClick={showMore} className="text-primary text-decoration-underline btn">Show all</p>}
        </>
        
        
    )
}