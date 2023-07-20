import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";


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

      //setting Github accessToken in DB
      if (auth.currentUser) {
        updateDoc(doc(db, "users", auth?.currentUser?.uid), {
          accessToken: accessToken
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