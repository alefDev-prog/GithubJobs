"use client";

import { jobInfo } from "@/interfaces/interface";
import Link from "next/link";
import { useState } from "react";

export default function CurrentJob({jobs}: {jobs: jobInfo[]}) {
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
    <div key={index} className="card mt-3">
        <div className="card-body">
        <h5 className="card-title text-primary">{job.title}</h5>
        <p className="card-text">Period: {job.period}</p>
        <p className="card-text">Salary: {job.salary}</p>
        <p className="card-text">Publisher: {job.publisher.name}</p>
        <Link href={job.repository.html_url} className="btn btn-primary text-white">Go to Repository</Link>
        </div>
    </div>
))}
{items.length !== jobs.length && <p onClick={showMore} className="text-primary text-decoration-underline btn">Show all</p>}
        </>
        
        
    )
    


}