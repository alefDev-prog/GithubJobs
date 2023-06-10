"use client";

import { useAuth } from "@/context/AuthContext";
import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import Repo from "./components/repo";

export default function Employer() {
    const currentUser = useAuth();
    const [repoInfo, setRepoInfo] = useState<any[]>([]);

    useEffect(() => {
        console.log(currentUser?.token);
        const token = localStorage.getItem("GithubToken");
        
        const octokit = new Octokit({ 
            auth: token
        });
        async function fetchRepositories() {
            const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
            console.log(response.data);
            setRepoInfo(response.data);
        }
        fetchRepositories();
    }, []);


    return (
        <main className="container-xl">
            <div className="row">
                <div className="col">
                    <div className="card border-1">
                        <div className="card-header">
                            <h3 className="card-title">Your repositories</h3>
                        </div>
                        <button onClick={() => console.log(currentUser)}>Check</button>
                        <div className="list-group" style={{maxHeight: "300px", overflowY:"scroll"}}>

                            {repoInfo.map((obj, index): React.ReactNode => {
                                return <Repo repository={obj} key={index} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    ok
                </div>
                
            </div>
        
        </main>
        
    );

}

