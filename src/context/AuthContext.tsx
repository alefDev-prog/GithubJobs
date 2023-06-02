"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import type { User } from "firebase/auth";



const AuthContext = createContext<User|null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children} : {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User|null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    }, [])

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}
