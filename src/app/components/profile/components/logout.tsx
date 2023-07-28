"use client";

import { useLogout } from "@/hooks/useLogout";

export default function Logout() {
    const { logout } = useLogout();

    async function handleLogout() {
        await logout();
        window.location.reload();
       
    }

    return (
        <button onClick={handleLogout} className="btn btn-danger text-white">Sign out</button>
    )
}