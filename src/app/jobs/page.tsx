"use client"

import { useSearchParams } from "next/navigation";


export default function Job() {

    const search = useSearchParams();
    const id = search.get("id");

  
    return (
        <div>Job: {id}</div>
    )


}