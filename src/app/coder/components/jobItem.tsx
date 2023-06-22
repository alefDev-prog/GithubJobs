"use client";

import { jobInfo } from "@/interfaces/interface";

export default function JobItem({info}: {info:jobInfo}) {
    return (
        <div className="card bg-light">
            <div className="card-body text-center">
                <h5 className="card-title">{info.title}</h5>
                <p className="card-text text-muted">
                    <strong>Period:</strong> {info.period}
                </p>
                <p className="card-text">
                    <strong>Salary:</strong> ${info.salary}
                </p>
                <p className="card-text">
                    <strong>Payment:</strong> {info.payment}
                </p>
            </div>
       </div>
    )
}