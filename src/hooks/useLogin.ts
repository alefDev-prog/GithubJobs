import { GithubAuthProvider, getIdToken, signInWithPopup } from "firebase/auth";
import { auth} from "../firebase/config";
import { useState } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "@/firebase/config";





export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();
  provider.addScope('repo');

  


  const login = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const accessToken = GithubAuthProvider.credentialFromResult(res)?.accessToken

      
      if (auth.currentUser && accessToken) {
        //get id token for later server side fetching
        const uid = auth.currentUser.uid;
        const idToken = await getIdToken(auth.currentUser);
        const loginResp = await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`
          },
          body: JSON.stringify({accessToken, uid})
        })
        

      }

      
      
      setIsPending(false)
    } catch (error) {
      console.log(error);
      setIsPending(false);
      if(error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { login, error, isPending };
};