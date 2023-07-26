import { adminSDK } from "@/firebase/admin";
import { useEffect } from "react";
import { cookies } from 'next/headers'
import { jobInfo, userApplication } from "@/interfaces/interface";

export default async function Test() {


        //Get the auth cookie
        const cookieStore = cookies()
        const serverCookie = cookieStore.get('serverCookie')?.value;
        const stringCookie = JSON.stringify(serverCookie);
        console.log(stringCookie);

        let jobData: jobInfo[] = [];
        let applicationData: userApplication[] = [];


        async function testFetch() {
            const resp = await fetch("https://jobsatgit.vercel.app/api/getprof", {
                headers: {
                    "Cookie": `serverCookie=${stringCookie}`
                },
                cache: "no-store"
            });
            const data = await resp.json();
            console.log(data);
            jobData = data.userJobsData;
            applicationData = data.userApplicationsData;

        }
        await testFetch();


    return (
        <>

        <h1>Test</h1>
        </>

    )
}