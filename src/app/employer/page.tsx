"use client";

import { useAuth } from "@/context/AuthContext";
import { Octokit } from "octokit";
import { useEffect } from "react";

export default function Employer() {
    const currentUser = useAuth();

    useEffect(() => {
        console.log(currentUser);
        
        /*
        const octokit = new Octokit({ 
            auth: token
        });



        async function fetchRepositories() {
            const response = await octokit.rest.repos.list;
            console.log(response);
        }
        fetchRepositories();
        
        */
    }, [currentUser]);


    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => console.log(currentUser)}>Check</button>
        </div>
    );

}

