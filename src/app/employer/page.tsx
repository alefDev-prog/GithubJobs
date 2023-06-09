"use client";

import { useAuth } from "@/context/AuthContext";
import { Octokit } from "@octokit/rest";
import { useEffect } from "react";

export default function Employer() {
    const currentUser = useAuth();

    useEffect(() => {
        console.log(currentUser?.token);
        const token = localStorage.getItem("GithubToken");
        
        
        const octokit = new Octokit({ 
            auth: token
        });



        async function fetchRepositories() {
            const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
            console.log(response);
        }
        fetchRepositories();
        
        
    }, []);


    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => console.log(currentUser)}>Check</button>
        </div>
    );

}

