import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import { use, useState } from "react";



export const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>("");
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
      setAccessToken(GithubAuthProvider.credentialFromResult(res)?.accessToken)
      
      setIsPending(false)
    } catch (error) {
      console.log(error);
      setIsPending(false);
      if(error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { login, error, isPending, accessToken };
};

/*

Ja se vec dugo vremena osjecam pravo kontrolisano i ne osjecam se slobodno. 
Ne osjecam se dobro i ne mogu vise ovako da zivim. Necu da me stalno pratite, govorite
sve kako i sta cu raditi. Ja vas mnogo volim ali ne mogu vise ovo da izdrzim.
Znam da vi govorite da uvijek moramo razgovarati o problemima. Ali ja se ne osjecam
prijatno ni sigurno da otvoreno razgovaram s vama o tome dok sam kuci.
Stupio sam u kontakt sa Socialtjänsten i oni su mi pomogli da nadjem mjesto gdje
mogu da zivim. Ja hocu da rijesimo ove probleme i da sretno skupa zivimo.


*/