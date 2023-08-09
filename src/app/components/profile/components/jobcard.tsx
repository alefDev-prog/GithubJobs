"use client";

import { jobInfo } from "@/interfaces/interface";
import Link from "next/link";
import { useState } from "react";


export default function JobCard({jobs}: {jobs: jobInfo[]}) {
    
    const [items, setItems] = useState<jobInfo[]>(jobs.slice(0,5))


    function showMore() {
        setItems(jobs);
    }

   
    if(items.length === 0) {
        return (
            <p className="mt-3">You have not published any jobs</p>
        )
    }


    return (
        <>
  {items.map((job: jobInfo, index:number) => (
    <div className="card mt-3 flex-grow-1" key={index}>
        <div className="card-body position-relative">
        {job.assignee && <span className="position-absolute bottom-0 end-0 me-2 mb-2 text-primary">Assigned</span>}
            <Link href={{pathname:"/job", query:{ id: job.id}}} className="link-underline-primary"><h5 className="card-title text-primary">{job.title}</h5></Link>
            {
            job.description.length > 50 
            ? <p className="card-text">Description: {job.description.substring(0,50)} . . .</p>
            : <p className="card-text">Description: {job.description}</p>
            }
            <p className="card-text">Payment: {job.payment}</p>
            <p className="card-text">Period: {job.period}</p>
        </div>
    </div>
))}
{items.length !== jobs.length && <p onClick={showMore} className="text-primary text-decoration-underline btn">Show all</p>}
        </>
        
        
    )
}