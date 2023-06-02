import { createContext, useContext, useState } from "react";
import { auth } from "@/firebase/config";


const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children} : {children: React.ReactNode}) {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}
