"use client";

import { Firestore, addDoc, collection } from "firebase/firestore";
import { employerReducer } from "./reducer";
import { FormEvent, useRef } from "react";
import { db } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { firestore } from "firebase-admin";
import { repoInfo } from "@/interfaces/interface";

export default function JobForm({values}: {values: employerReducer}) {
    const title = useRef<HTMLInputElement|null>(null);
    const description = useRef<HTMLTextAreaElement|null>(null);
    const payment = useRef<HTMLSelectElement|null>(null);
    const period = useRef<HTMLInputElement|null>(null);
    const salary = useRef<HTMLInputElement|null>(null);

    const jobCollection = collection(db, "jobs");
    
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



        try {
            if(title.current && description.current && payment.current && period.current && salary.current) {
                await addDoc(jobCollection,
                {
                    
                    title: title.current.value,
                    repository: doneRepo,
                    description: description.current.value,
                    payment: payment.current.value,
                    period: period.current.value,
                    salary: salary.current.value,
                    publisher: currentUser?.user?.uid,
                    createdAt: timeStamp
                    
                });
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