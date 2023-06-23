"use client";

import { jobInfo } from "@/interfaces/interface";

export default function JobItem({info}: {info:jobInfo}) {
    return (
        <div className="card bg-light">
            <div className="m-2">
                <img
                src={info.publisher.image}
                alt="User Image"
                className="rounded-circle"
                width={30}
                height={30}
            />
                <h5 className="card-title">{info.publisher.name}</h5>
            </div>
            
            <div className="card-body text-center">
                    <h5 className="card-title">{info.title}</h5>
                    <p className="card-text text-muted">
                        <strong>Period:</strong> {info.period}
                    </p>
                    <p className="card-text">
                        <strong>Salary:</strong> {info.salary}
                    </p>
                    <p className="card-text">
                        <strong>Payment:</strong> {info.payment}
                    </p>
            </div>
       </div>
    )
}