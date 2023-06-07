"use client";
import { useAuth } from "@/context/AuthContext";
import {useLogin} from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { useEffect } from "react";

export default function Login() {
    const {login, isPending, accessToken} = useLogin();
    const { logout } = useLogout();
    const currentUser = useAuth();
    
    useEffect(() => {
        currentUser?.setToken(accessToken);
    }, [accessToken])

    function handleLogout() {
        logout();
    }
    

    

    return (
        <main className="container container-primary">
            <div className="App">
                <button onClick={() => console.log(currentUser)}>Check</button>
                <button onClick={() => console.log(accessToken)}>Check access</button>
                <button onClick={() => currentUser?.setToken("asdadsa")}>Check set</button>
                <button className="btn btn-primary" onClick={login}>
                    {isPending ? "Loading..." : "Login With Github"}
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
        </main>
    )
}