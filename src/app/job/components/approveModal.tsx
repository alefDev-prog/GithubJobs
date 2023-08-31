"use client";

import { Dispatch, useReducer } from "react";
import { actionKind, initialValues, jobControlAction, jobControlState, reducer } from "./reducer/reducer";


export default function ApproveModal({state, dispatch}: {state: jobControlState, dispatch: Dispatch<jobControlAction>}) {

    
 
    function handleClose() {
        dispatch({type: actionKind.CLOSE_APPROVE_MODAL});
        
    }

    return (

        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Approve</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>An approval of the work would result in the job being terminated.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="button" className="btn btn-primary text-white">Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}