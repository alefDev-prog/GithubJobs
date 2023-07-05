"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { DocumentData, collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {

    const currentUser = useAuth();
    const [userData, setUserData] = useState<DocumentData | undefined | null>(null);

    useEffect(() => {

        async function getData() {
            const userId = currentUser?.user?.uid;
        
            
            try {
               
                const docRef = doc(db, "users", userId? userId : "");
                
                //fetch jobs
                const userJobsRef = collection(docRef, "userJobs");
                const userJobsSnap = await getDocs(userJobsRef);
                const userJobsData = userJobsSnap.docs.map((doc) => doc.data());

                //fetch applications
                const userApplicationsRef = collection(docRef, "userApplications");
                const userApplicationsSnap = await getDocs(userApplicationsRef);
                const userApplicationsData = userApplicationsSnap.docs.map((doc) => doc.data());
                
                setUserData({
                    jobs:userJobsData,
                    applications: userApplicationsData
                });
               
            } catch(err) {
                console.log(err);
            }
            
        }

        getData();
        
    }, [currentUser]);


    return(
        <button onClick={() => console.log(userData)}>Profile</button>
    )
}