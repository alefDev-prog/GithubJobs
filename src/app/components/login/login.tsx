"use client";
import { useAuth } from "@/context/AuthContext";
import {useLogin} from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import Image from "next/image";



export default function Login() {
    const {login} = useLogin();
   

    async function handleLogin() {
        await login();
        window.location.reload();
    }
    
    

    

    return (
        <main className="container container-primary text-center py-5 d-flex flex-column justify-content-center vh-100">
        <div className="bg-primary text-white p-5 rounded-top">
            <h1>Github Jobs</h1>
            <h3 className="mb-4 text-black">Upload jobs, apply for jobs, all with Github Jobs</h3>
        </div>
        <div className="d-flex flex-column align-items-center bg-light p-5 rounded-bottom">
                <Image 
                src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tNC40NjYgMTkuNTljLS40MDUuMDc4LS41MzQtLjE3MS0uNTM0LS4zODR2LTIuMTk1YzAtLjc0Ny0uMjYyLTEuMjMzLS41NS0xLjQ4MSAxLjc4Mi0uMTk4IDMuNjU0LS44NzUgMy42NTQtMy45NDcgMC0uODc0LS4zMTItMS41ODgtLjgyMy0yLjE0Ny4wODItLjIwMi4zNTYtMS4wMTYtLjA3OS0yLjExNyAwIDAtLjY3MS0uMjE1LTIuMTk4LjgyLS42NC0uMTgtMS4zMjQtLjI2Ny0yLjAwNC0uMjcxLS42OC4wMDMtMS4zNjQuMDkxLTIuMDAzLjI2OS0xLjUyOC0xLjAzNS0yLjItLjgyLTIuMi0uODItLjQzNCAxLjEwMi0uMTYgMS45MTUtLjA3NyAyLjExOC0uNTEyLjU2LS44MjQgMS4yNzMtLjgyNCAyLjE0NyAwIDMuMDY0IDEuODY3IDMuNzUxIDMuNjQ1IDMuOTU0LS4yMjkuMi0uNDM2LjU1Mi0uNTA4IDEuMDctLjQ1Ny4yMDQtMS42MTQuNTU3LTIuMzI4LS42NjYgMCAwLS40MjMtLjc2OC0xLjIyNy0uODI1IDAgMC0uNzgtLjAxLS4wNTUuNDg3IDAgMCAuNTI1LjI0Ni44ODkgMS4xNyAwIDAgLjQ2MyAxLjQyOCAyLjY4OC45NDR2MS40ODljMCAuMjExLS4xMjkuNDU5LS41MjguMzg1LTMuMTgtMS4wNTctNS40NzItNC4wNTYtNS40NzItNy41OSAwLTQuNDE5IDMuNTgyLTggOC04czggMy41ODEgOCA4YzAgMy41MzMtMi4yODkgNi41MzEtNS40NjYgNy41OXoiLz48L3N2Zz4="}
                alt="github-logo"
                height={80}
                width={80}
                loading="lazy"
                />
                <h5 className="mt-4">Sign in with your Github account and start your adventure</h5>
            <button className="btn btn-primary mt-3 text-white" onClick={handleLogin}>Login</button>
        </div>
    </main>
    )
}