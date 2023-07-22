import { adminSDK } from "@/firebase/admin";
import { useEffect } from "react";
import { cookies } from 'next/headers'

export default async function Test() {

        const cookieStore = cookies()
        const serverCookie = cookieStore.get('serverCookie')?.value;
        const stringCookie = JSON.stringify(serverCookie);

  
        async function testFetch() {
            const resp = await fetch("https://jobsatgit.vercel.app/api/auth", {
                headers: {
                    "Cookie": `serverCookie=${stringCookie}`
                },
                cache: "no-store"
            });
            const data = await resp.json()
            console.log(data);
            
        }
    
        const loggedIn = await testFetch();
  
    
    return (
        <>
        <h1>Test</h1>
        </>
        
    )
}