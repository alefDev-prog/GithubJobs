import { GithubAuthProvider, getIdToken, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { encrypt } from "@/app/crypto/funcs";


export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();


  const login = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const accessToken = GithubAuthProvider.credentialFromResult(res)?.accessToken

      
      if (auth.currentUser && accessToken) {
        //get id token for later server side fetching
        const idToken = await getIdToken(auth.currentUser);
        const loginResp = await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        if(loginResp.status === 200) {
            //setting Github accessToken in DB
            console.log(await loginResp.json())
            const encryptedToken = encrypt(accessToken);
            console.log("here");
            await updateDoc(doc(db, "users", auth?.currentUser?.uid), {
            accessToken: encryptedToken
        })
        }

        

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