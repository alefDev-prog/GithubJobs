"use client";

import { jobInfo, submittedWork } from "@/interfaces/interface";
import Link from 'next/link';
import { useReducer, useState } from "react";
import { reducer, initialValues, actionKind } from "./reducer/reducer";
import ApproveModal from "./approveModal";
import RequestModal from "./requestModal";

export default function JobControl({job}: {job: jobInfo}) {

    const submittedWork = job.assignee?.submittedWork as submittedWork;

    const [state, dispatch] = useReducer(reducer, initialValues);

    

    async function approve() {
        dispatch({type: actionKind.OPEN_APPROVE_MODAL});
    }

    async function requestChange () {
        dispatch({type: actionKind.OPEN_REQUEST_MODAL});
    }

    return (
       <>
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
                        <button type="button" className="btn btn-primary text-white m-2" onClick={approve}>Approve</button>
                        <button type="button" className="btn btn-danger text-white m-2" onClick={requestChange}>Request Changes</button>
                    </div>
                </div>
            </div>
            <ApproveModal state={state} dispatch={dispatch}/>
            <RequestModal state={state} dispatch={dispatch} />
       </> 


      
    )
}
