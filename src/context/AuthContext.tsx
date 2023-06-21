"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { User, onIdTokenChanged } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";

interface UserInfo {
  user?: User|null,
  token?: string
  setToken: any
}

const AuthContext = createContext<UserInfo|null>(null);


export function AuthProvider({children} : {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User|null>(null);
    const [token, setToken] = useState("");

    const currentUserInfo: UserInfo = {
      user: currentUser,
      token: token,
      setToken: setToken
    } 

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
          setCurrentUser(user);

          if(user) {
            Cookies.set('loggedIn', "loggedIn", {expires: 10})
          }
          else {
            Cookies.remove('loggedIn');
          }


        });

        GithubAuthProvider.credential
     
        return unsubscribe;
      }, []);

    return (
        <AuthContext.Provider value={currentUserInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext);
}
