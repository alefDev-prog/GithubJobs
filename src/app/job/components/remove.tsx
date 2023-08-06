"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";

import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Remove({jobId}: {jobId: string}) {
    const currentUser = useAuth();
    const {push} = useRouter();
    const userId = currentUser?.uid;
    console.log(userId)

    async function removeJob() {
        if(userId) {
        await deleteDoc(doc(db, "users", userId, "userJobs", jobId));
        push("/");
        }
    }
    return (
        <button onClick={removeJob} className="btn-danger text-white btn rounded-0 rounded-bottom-2">Delete job</button>
    )
}