"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { User, onIdTokenChanged } from "firebase/auth";




const AuthContext = createContext<User|null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children} : {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User|null>(null);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        });
     
        return unsubscribe;
      }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}
