"use client";
import { useAuth } from "@/context/AuthContext";
import {useLogin} from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { useEffect } from "react";
import { Octokit } from "@octokit/rest";

export default function Login() {
    const {login, isPending, accessToken} = useLogin();
    const { logout } = useLogout();
    const currentUser = useAuth();
    
    useEffect(() => {
        if(accessToken)
        localStorage.setItem("GithubToken", accessToken);

    }, [accessToken])

    function handleLogout() {
        currentUser?.setToken("");
        logout();
    }
    async function getData() {
        const credential = localStorage.getItem("GithubToken");
        const octokit = new Octokit({auth: credential});
        const data = await octokit.users.getAuthenticated();
        console.log(data);
    
    }
    
    

    

    return (
        <main className="container container-primary">
            <div className="App">
                <button onClick={() => console.log(currentUser)}>Check</button>
                <button onClick={() => console.log(accessToken)}>Check access</button>
                <button onClick={currentUser?.setToken(accessToken)}>set</button>
                <button onClick={getData}>Get data</button>
                <button className="btn btn-primary" onClick={login}>
                    {isPending ? "Loading..." : "Login With Github"}
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
        </main>
    )
}