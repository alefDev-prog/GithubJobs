"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { User, onIdTokenChanged, onAuthStateChanged } from "firebase/auth";
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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);

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

    return (
        <AuthContext.Provider value={currentUserInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext);
}
