import "../bootstrap/custom.scss";
import { AuthProvider } from '@/context/AuthContext';
import Navbar from './components/navbar';

export const metadata = {
  title: 'Github Jobs',
  description: 'Get paid while working on github repositories',
}

//revalidating all data
const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <AuthProvider>
        <body>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
