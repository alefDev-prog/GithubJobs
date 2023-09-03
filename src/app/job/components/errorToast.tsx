"use client";

export default function ErrorToast(){
    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 5}}>
            <div className="toast show bg-danger text-white p-3" style={{fontSize: '1.5rem'}}>
                <div className="toast-header">
                    <strong className="me-auto">Notification</strong>
                </div>
                <div className="toast-body">
                You have not required any changes for this PR in Github!
                </div>
            </div>
        </div>
    )
}