"use client";

import { userApplication } from "@/interfaces/interface";
import Link from "next/link";
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
                    <Link href={{pathname:"/application", query:{ jobId: app.job.id, appId: app.id}}} className="link-underline-primary"><h5 className="card-title text-primary">{app.job.title}</h5></Link>
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