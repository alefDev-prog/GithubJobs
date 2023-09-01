"use client";

import { Dispatch } from "react";
import { actionKind, jobControlAction, jobControlState} from "./reducer/reducer";
import { jobInfo } from "@/interfaces/interface";


export default function RequestModal({state, dispatch, job}: {state: jobControlState, dispatch: Dispatch<jobControlAction>, job:jobInfo}) {

    
 
    function handleClose() {
        console.log("here");
        dispatch({type: actionKind.CLOSE_REQUEST_MODAL});
    }


    async function handleRequest() {
        const requestAction = await fetch("/api/requestChange", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });
        if(requestAction.ok) {
            const resp = await requestAction.json();
            console.log(resp);
        }

    }

    return (

        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Request changes</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to request changes?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="button" className="btn btn-danger text-white" onClick={handleRequest}>Request changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}