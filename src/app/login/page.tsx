"use client";
import { useAuth } from "@/context/AuthContext";
import {useLogin} from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";



export default function Login() {
    const {login, isPending } = useLogin();
    const { logout } = useLogout();
    const currentUser = useAuth();
    
    


    async function handleLogout() {
        await logout();
        window.location.reload();
       
    }

    async function handleLogin() {
        await login();
        //window.location.reload();
    }
    
    

    

    return (
        <main className="container container-primary">
            <div className="App">
                <button onClick={() => console.log(currentUser)}>Check</button>
                <button className="btn btn-primary" onClick={handleLogin}>
                    {isPending ? "Loading..." : "Login With Github"}
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
        </main>
    )
}