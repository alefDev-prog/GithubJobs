"use client";

import { jobInfo } from "@/interfaces/interface";
import Link from "next/link";

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
                <Link href={{pathname:"/jobs", query:{ id: info.id}}}><h5 className="card-title">{info.title}</h5></Link>
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