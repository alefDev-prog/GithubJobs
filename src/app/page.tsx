import { cookies } from 'next/headers';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicLogin = dynamic(() =>
  import('./components/login/login').then((mod) => mod.default)
);
{/* @ts-expect-error Server Component */}
const DynamicProfile = dynamic(() =>
  import('./components/profile/profile').then((mod) => mod.default)
);

export default function Home() {
  
  const nextCookies = cookies();
  const token = nextCookies.get('loggedIn'); 

  if(token) {
      return <DynamicProfile />
  }
  else {
    return <DynamicLogin />
  } 
}