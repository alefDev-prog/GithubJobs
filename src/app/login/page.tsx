"use client";
import {useLogin} from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";

export default function Login() {
    const {login, isPending} = useLogin();
    const { logout } = useLogout();

    return (
        <main className="container container-primary">
            <div className="App">
                <button className="btn btn-primary" onClick={login}>
                    {isPending ? "Loading..." : "Login With Github"}
                </button>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>
        </main>
    )
}