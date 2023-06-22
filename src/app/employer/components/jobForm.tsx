"use client";

import { addDoc, collection, doc, getDoc,setDoc} from "firebase/firestore";
import { employerReducer } from "./reducer";
import { FormEvent, useRef } from "react";
import { db } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { repoInfo } from "@/interfaces/interface";
import { serverTimestamp } from "firebase/firestore";

export default function JobForm({values}: {values: employerReducer}) {
    const title = useRef<HTMLInputElement|null>(null);
    const description = useRef<HTMLTextAreaElement|null>(null);
    const payment = useRef<HTMLSelectElement|null>(null);
    const period = useRef<HTMLInputElement|null>(null);
    const salary = useRef<HTMLInputElement|null>(null);

    
    const userCollection = collection(db, "users");
    
    const currentUser = useAuth();


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const timeStamp = new Date();
        
        const doneRepo: repoInfo = {
            name: values.currentRepo.name,
            html_url: values.currentRepo.html_url,
            private: values.currentRepo.private,
            language: values.currentRepo.language,
            stargazers_count: values.currentRepo.stargazers_count
        }

        const userInfo = {
            name: currentUser?.user?.displayName,
            image: currentUser?.user?.photoURL,
            userId: currentUser?.user?.uid
        }


        try {
            if (title.current && description.current && payment.current && period.current && salary.current) {
                const jobOffering = {
                    title: title.current.value,
                    repository: doneRepo,
                    description: description.current.value,
                    payment: payment.current.value,
                    period: period.current.value,
                    salary: salary.current.value,
                    publisher: userInfo,
                    createdAt: serverTimestamp()
                }

                const userId = currentUser?.user?.uid;

                if(userId){
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);
                    const subCollectionRef = collection(docRef, "userJobs");

                    if(docSnap.exists()) {
                        console.log(docSnap.data());   
                    }
                    else {
                        await setDoc(doc(userCollection, userId), {
                            name: currentUser?.user?.displayName,
                        });   
                    }
                        await setDoc(doc(subCollectionRef), jobOffering)
                } 
                
            
            }
        } catch(error) {
            console.log(error);
        }
        
    }




    return (
        <div className="col">
            <h2>Repository: <a href={values.currentRepo.html_url} target="_blank">{values.currentRepo.name}</a></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input type="text"
                    className="form-control form-control-lg"
                    id="jobTitle" placeholder="Enter job title"
                    ref={title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea className="form-control" id="jobDescription" rows={3} ref={description}></textarea>
                </div>
                <div className="form-group">
                    <label>Payment</label>
                    <select className="form-control" ref={payment}>
                        <option>Fixed price</option>
                        <option>Per milestone</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="jobPeriod">Job Period</label>
                    <input type="text" className="form-control" id="jobPeriod" placeholder="Enter job period"
                    ref={period}/>
                </div>
                <div className="form-group col-auto">
                    <label htmlFor="jobSalary">Job Salary</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input type="number" className="form-control" id="jobSalary" placeholder="Enter job salary" min={0}
                        ref={salary}/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}