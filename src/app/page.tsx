import { cookies } from 'next/headers';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import verifyAuth from '@/authMiddleware/auth';
import { userDataInterface } from '@/interfaces/interface';

const DynamicLogin = dynamic(() =>
  import('./components/login/login').then((mod) => mod.default)
);
{/* @ts-expect-error Server Component */}
const DynamicProfile = dynamic(() =>
  import('./components/profile/profile').then((mod) => mod.default)
);

export default async function Home() {

  const { signal } = new AbortController()
  const nextCookies = cookies();
  const token = nextCookies.get('loggedIn'); 
  
  if(token) {
    const uid = await verifyAuth();

    if(typeof uid !== "string") return <DynamicLogin/>


    const dataFetch = await fetch(process.env.URL + "/api/getUserData", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(uid),
      cache: 'no-store',
      signal
    },
    );
    if(dataFetch.ok){
      const userData = await dataFetch.json() as userDataInterface;
      console.log(userData);
      return <DynamicProfile userData={userData} />
    }
  }
  else {
    return <DynamicLogin />
  } 
}