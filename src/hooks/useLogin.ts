import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();

  const login = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      console.log(user);
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