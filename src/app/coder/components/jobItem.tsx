"use client";

import { jobInfo } from "@/interfaces/interface";
import Image from "next/image";
import Link from "next/link";

export default function JobItem({info}: {info:jobInfo}) {
    if(!info) return <></>;
    return (
        <div className="card mt-3">
            <div className="m-2">
                <Image
                src={info.publisher.image}
                alt="User Image"
                className="rounded-circle"
                width={30}
                height={30}
            />
                <h5 className="card-title">{info.publisher.name}</h5>
            </div>
            
            <div className="card-body text-center">
                <Link href={{pathname:"/jobs", query:{ id: info.id}}} className="link-underline-primary"><h5 className="card-title text-primary">{info.title}</h5></Link>
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
