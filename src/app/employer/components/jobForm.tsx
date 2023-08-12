"use client";

import { collection, doc, setDoc, serverTimestamp} from "firebase/firestore";
import { FormEvent, Key,  useRef, useState } from "react";
import { db } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { repoInfo } from "@/interfaces/interface";
import Repo from "./repo";




export default function JobForm({repos, githubURL}: {repos: repoInfo[], githubURL: string}) {
   
     

    const [currentRepo, setCurrentRepo] = useState<repoInfo>()
    const title = useRef<HTMLInputElement|null>(null);
    const description = useRef<HTMLTextAreaElement|null>(null);
    const payment = useRef<HTMLSelectElement|null>(null);
    const period = useRef<HTMLInputElement|null>(null);
    const salary = useRef<HTMLInputElement|null>(null);

    
    const currentUser = useAuth();
 

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!currentRepo || !currentUser) return;
        
        
    
        
        const doneRepo: repoInfo = {
            name: currentRepo.name,
            html_url: currentRepo.html_url,
            private: currentRepo.private,
            language: currentRepo.language,
            stargazers_count: currentRepo.stargazers_count
        }

        
        const userInfo = {
            name: currentUser.displayName || currentUser.providerData[0].displayName,
            image: currentUser.photoURL,
            userId: currentUser.uid,
            githubURL: githubURL
        }


        try {
            if (title.current && description.current && payment.current && period.current && salary.current) {
                

                const userId = currentUser.uid;

                if(userId){
                    const docRef = doc(db, "users", userId);
                    
                    const subCollectionRef = collection(docRef, "userJobs");

                    const jobDoc = doc(subCollectionRef);
                    const jobOffering = {
                        title: title.current.value,
                        repository: doneRepo,
                        description: description.current.value,
                        payment: payment.current.value,
                        period: period.current.value,
                        salary: salary.current.value,
                        assignee: null,
                        publisher: userInfo,
                        createdAt: serverTimestamp(),
                        id: jobDoc.id,
                        applications: []
                    }
                    await setDoc(jobDoc, jobOffering)
                } 
                
            
            }
        } catch(error) {
            console.log(error);
        }
        
    }




    return (
        <>
    {/*Repo selector*/}
    <div className="col d-flex flex-column mb-4">
        <div className="card border-1  flex-grow-1 d-flex flex-column">
            <div className="card-header bg-primary text-white">
                <h3 className="card-title">Your repositories</h3>
            </div>
            <div className="list-group flex-grow-1 overflow-auto" style={{maxHeight: "500px"}}>

                {repos.map((obj: object, index: Key | null | undefined): React.ReactNode => {
                    return <Repo repository={obj} setCurrentRepo={setCurrentRepo} key={index}/>
                })}
            </div>
        </div>  
    </div>

    {/*Repo form*/}
    <div className="col d-flex flex-column">
        <div className="bg-primary text-white p-2 rounded-top">
            <h2>Repository: <a className="text-light" href={currentRepo?.html_url} target="_blank">{currentRepo?.name}</a></h2>
        </div>
        <form onSubmit={handleSubmit} className="p-3 border rounded-bottom bg-light flex-grow-1 d-flex flex-column overflow-auto" style={{maxHeight: "500px"}}>
            <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input type="text"
                className="form-control form-control-lg rounded"
                id="jobTitle" placeholder="Enter job title"
                ref={title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea className="form-control rounded" id="jobDescription" rows={3} ref={description}></textarea>
            </div>
            <div className="form-group">
                <label>Payment</label>
                <select className="form-control rounded" ref={payment}>
                    <option>One-time payment</option>
                    <option disabled>Per milestone</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="jobPeriod">Job Period</label>
                <input type="text" className="form-control rounded" id="jobPeriod" placeholder="Enter job period"
                ref={period}/>
            </div>
            <div className="form-group col-auto">
                <label htmlFor="jobSalary">Job Salary</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input type="number" className="form-control rounded" id="jobSalary" placeholder="Enter job salary" min={0}
                    ref={salary}/>
                </div>
            </div>
            <div className="form-group mt-auto">
                <button type="submit" className="btn btn-primary text-white">Submit</button>
            </div>
        </form>
    </div>
</>
    
        
    )
}