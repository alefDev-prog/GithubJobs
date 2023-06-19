import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from './components/navbar';

export const metadata = {
  title: 'Github Jobs',
  description: 'Get paid while working on github repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <AuthProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
