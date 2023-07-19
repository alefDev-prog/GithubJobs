"use client";

import { useAuth } from "@/context/AuthContext";
import { Octokit } from "@octokit/rest";
import { useEffect, useReducer, Key } from "react";
import Repo from "./components/repo";
import { employerReducer, ActionKinds, initialValues, Action } from "./components/reducer";
import JobForm from "./components/jobForm";

export default function Employer() {
    const currentUser = useAuth();
    const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    useEffect(() => {
        const token = localStorage.getItem("GithubToken");
        
        const octokit = new Octokit({ 
            auth: token
        });
        async function fetchRepositories() {
            const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
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
                <JobForm values={values} />
                
            </div>
        </main>
        
    );

}

