import { adminSDK } from "@/firebase/admin";
import { useEffect } from "react";

export default function Test() {

  
        async function testFetch() {
            const resp = await fetch("http://localhost:3000/api/auth", );
            console.log(await resp.json());
        }
    
        testFetch();
  
    
    return (
        <h1>Test</h1>
    )
}