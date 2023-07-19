"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { User, onIdTokenChanged, onAuthStateChanged } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";


const AuthContext = createContext<User|null>(null);


export function AuthProvider({children} : {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User>();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user as User);

          if(user) {
            Cookies.set('loggedIn', "loggedIn", {expires: 10});
            if(user?.photoURL) Cookies.set("user-image", user?.photoURL);
            if(user?.displayName) Cookies.set("user-name", user?.displayName);
            else if(auth.currentUser?.providerData[0].displayName) Cookies.set("user-name", auth.currentUser?.providerData[0].displayName);
          }
          else {
            Cookies.remove('loggedIn');
          }

          

        });

        GithubAuthProvider.credential
     
        return unsubscribe;
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
