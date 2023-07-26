import { adminSDK } from "@/firebase/admin";
import { useEffect } from "react";
import { cookies } from 'next/headers'
import { jobInfo, userApplication } from "@/interfaces/interface";
import verifyAuth from "@/authMiddleware/auth";
import getData from "./utils/getUserData";

export default async function Test() {


    const uid = await verifyAuth();

    if(typeof uid ==="string") {
        const userData = await getData(uid) as {userJobsData: jobInfo[], userApplicationsInfo: userApplication[]}
        console.log(userData);
        return (
            <>
    
            <h1>{userData.userJobsData[0].period}</h1>
            </>
    
        )
    }

    else return (
        <h1>Not logged in</h1>
    )

    
}