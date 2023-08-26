"use client";

export default function SubmitToast(){
    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 5}}>
            <div className="toast show bg-primary text-white p-3" style={{fontSize: '1.5rem'}}>
                <div className="toast-header">
                    <strong className="me-auto">Notification</strong>
                </div>
                <div className="toast-body">
                    Work successfully submitted!
                </div>
            </div>
        </div>
    )
}