"use client";

import { Dispatch, useReducer } from "react";
import { actionKind, initialValues, jobControlAction, jobControlState, reducer } from "./reducer/reducer";


export default function ApproveModal({state, dispatch}: {state: jobControlState, dispatch: Dispatch<jobControlAction>}) {

    
 
    function handleClose() {
        dispatch({type: actionKind.CLOSE_APPROVE_MODAL});
    }

    if(!state.showApproveModal) {
        return <></>
    }

    return (

        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this job?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="button" className="btn btn-danger text-white">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}