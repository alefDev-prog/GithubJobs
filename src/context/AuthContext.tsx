"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { User, onIdTokenChanged, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";


const AuthContext = createContext<User|null>(null);


export function AuthProvider({children} : {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User>();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user as User);

          if(user) {
            Cookies.set('loggedIn', "loggedIn", {expires: 12});
          }
          else {
            Cookies.remove('loggedIn');
          }

          

        });
     
        return () => unsubscribe();
      }, []);

    
    if(currentUser) {
      return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
      )
    }
    else return(
    <>
      {children}
    </> 

    )

    
}

export function useAuth() {
  return useContext(AuthContext);
}
