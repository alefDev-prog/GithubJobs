"use client";

import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";

export default function ClientInteractions({jobData}: {jobData: {userId: string, job: jobInfo}}) {

    const { job, userId} = jobData;

    async function fork() {
        const forkAction = await fetch("/api/fork", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resp = await forkAction.json();
        console.log(resp);
    }

    if(job.assignee?.forked === true) {
        return <h1>It is forked</h1>
    } 
    else return (
        <>
            <h1>Not forked</h1>
            <button onClick={fork}>Fork</button>
        </>
        
    )

}