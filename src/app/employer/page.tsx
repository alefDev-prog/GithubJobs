"use client";

import { useAuth } from "@/context/AuthContext";
import { Octokit } from "@octokit/rest";
import { useEffect, useReducer, Key } from "react";
import Repo from "./components/repo";
import { employerReducer, ActionKinds, initialValues, Action } from "./components/reducer";

export default function Employer() {
    const currentUser = useAuth();
    const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    useEffect(() => {
        console.log(currentUser?.token);
        const token = localStorage.getItem("GithubToken");
        
        const octokit = new Octokit({ 
            auth: token
        });
        async function fetchRepositories() {
            const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
            console.log(response.data);
            dispatch({type: ActionKinds.SET_REPO_INFO, payload: response.data});
        }
        fetchRepositories();
    }, []);


    return (
        <main className="container-xl">
            <div className="row">

                {/* The selection of repo */}
                <div className="col">
                    <div className="card border-1">
                        <div className="card-header">
                            <h3 className="card-title">Your repositories</h3>
                        </div>
                        <button onClick={() => console.log(values.currentRepo)}>check</button>
                        <div className="list-group" style={{maxHeight: "300px", overflowY:"scroll"}}>

                            {values.repoInfo.map((obj: object, index: Key | null | undefined): React.ReactNode => {
                                return <Repo repository={obj} setCurrentRepo={dispatch} key={index}/>
                            })}
                        </div>
                    </div>  
                </div>

                {/* Adding description of job for repo */}
                <div className="col">
                    <form>
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input type="text" className="form-control form-control-lg" id="jobTitle" placeholder="Enter job title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobDescription">Job Description</label>
                            <textarea className="form-control" id="jobDescription" rows={3}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Payment</label>
                            <select className="form-control">
                                <option>Fixed price</option>
                                <option>Per milestone</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobPeriod">Job Period</label>
                            <input type="text" className="form-control" id="jobPeriod" placeholder="Enter job period" />
                        </div>
                        <div className="form-group col-auto">
                            <label htmlFor="jobSalary">Job Salary</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input type="number" className="form-control" id="jobSalary" placeholder="Enter job salary" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        
    );

}

