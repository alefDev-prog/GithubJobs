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
    const envTest = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    
    useEffect(() => {
        if(accessToken)
        localStorage.setItem("GithubToken", accessToken);

    }, [accessToken])

    async function handleLogout() {
        currentUser?.setToken("");
        await logout();
        window.location.reload();
       
    }
    async function getData() {
        const credential = localStorage.getItem("GithubToken");
        const octokit = new Octokit({auth: credential});
        const data = await octokit.users.getAuthenticated();
        console.log(data);
    }

    async function handleLogin() {
        await login();
        //window.location.reload();
        
        
    }
    
    

    

    return (
        <main className="container container-primary">
            <div className="App">
                <button onClick={() => console.log(currentUser)}>Check</button>
                <button onClick={() => console.log(accessToken)}>Check access</button>
                <button onClick={currentUser?.setToken(accessToken)}>set</button>
                <button onClick={getData}>Get data</button>
                <button className="btn btn-primary" onClick={handleLogin}>
                    {isPending ? "Loading..." : "Login With Github"}
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                <button onClick={() => console.log(envTest)}>Env</button>
            </div>
        </main>
    )
}