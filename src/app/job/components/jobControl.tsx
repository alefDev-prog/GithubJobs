"use client";

import { jobInfo, submittedWork } from "@/interfaces/interface";
import Link from 'next/link';

export default function JobControl({job}: {job: jobInfo}) {

    const submittedWork = job.assignee?.submittedWork as submittedWork;

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="card text-center">
                <div className="card-header">
                    Job Submission
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link href={submittedWork.PR_url} className="link-underline-primary">
                            <p className="text-primary">{submittedWork.PR_title}</p>
                        </Link>
                    </h5>
                    <button type="button" className="btn btn-primary text-white m-2">Approve</button>
                    <button type="button" className="btn btn-danger text-white m-2">Request Changes</button>
                </div>
            </div>
        </div>
    )
}
