"use client";

import { Dispatch, useState } from "react";
import { actionKind, jobControlAction, jobControlState} from "./reducer/reducer";
import { jobInfo } from "@/interfaces/interface";
import ErrorToast from "./errorToast";


export default function RequestModal({state, dispatch, job}: {state: jobControlState, dispatch: Dispatch<jobControlAction>, job:jobInfo}) {

    
    const [showToast, setShowToast] = useState(false);

    
    function handleClose() {
        console.log("here");
        dispatch({type: actionKind.CLOSE_REQUEST_MODAL});
    }


    function handleToast() {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }

    
    async function handleRequest() {
        const requestAction = await fetch("/api/requestChange", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });
        const resp = await requestAction.json();
        console.log(resp);
        if(requestAction.ok) {
            
            window.location.reload();
        }
        else {

            handleToast();
        }

    }

    return (

        <>

            {showToast && <ErrorToast />}
            <div className="modal-backdrop fade show" style={{zIndex: 4}}></div>
            
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