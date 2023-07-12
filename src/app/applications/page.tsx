"use client";


import { useAuth } from "@/context/AuthContext";

import { useEffect, useState } from "react";
import { applicationData } from "@/interfaces/interface";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default async function Applications() {
  const currentUser = useAuth();
  const search = useSearchParams();
  const id = search.get("id");

  const [jobData, setJobData] = useState<any>(null);
  const [applicationData, setApplicationData] = useState<applicationData | null>(null);
/*
  useEffect(() => {
    async function getData() {
      const userId = currentUser?.user?.uid;
      const jobId = searchParams.id.split("|")[0];
      const appId = searchParams.id.split("|")[1];
    
      if (userId) {
        const jobDoc = doc(db, "users", userId, "userJobs", jobId);
        const userJobSnap = await getDoc(jobDoc);
        const jobData = userJobSnap.data();
        let applicationData;

        
        jobData?.applications.forEach((app: any) => {
            if(app.id === appId) {
                applicationData = app;
                return;
            }
        });
      }

      setJobData({jobData,applicationData});
    }

    getData();
  }, [currentUser]);
*/


  return (
    <>
      <p>application: {id}</p>
      <button onClick={() => setJobData("test")}>test</button>
      <button onClick={() => console.log(jobData)}>test</button>
      <button onClick={() => console.log("ok")}>testing </button>
    </>
  );
}

/*
import { useAuth } from "@/context/AuthContext";
import { fetchApplication } from "./utils/utils";
import { useEffect, useState } from "react";
import { applicationData } from "@/interfaces/interface";


export default async function Applications({searchParams}: any) {
    const currentUser = useAuth();

    const [jobData, setJobData] = useState<any>(null);
    const [applicationData, setApplicationData] = useState<applicationData|null>(null);

    useEffect(() => {

        async function getData() {
            const userId = currentUser?.user?.uid;
            const jobId = searchParams.id.split("|")[0];
            const appId = searchParams.id.split("|")[1];
            console.log(jobId);
            console.log(appId);
            let info;
            if(userId) {
                info = await fetchApplication(jobId, appId, userId);
                console.log(info);
                setJobData(info);
            }
            
        }

        getData();
        
    },[currentUser]);



    return(
        <>
            <p>appliacation: {searchParams.id}</p>
            <button onClick={() => console.log(jobData)}>test</button>
        </>
    )
}
*/