import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


export default function Home() {
  
  return (
    <main>
      <Link href="/login" className="btn btn-primary">Log in</Link>
    </main>
  )
}
