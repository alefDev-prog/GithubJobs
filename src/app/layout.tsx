import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from '@/context/AuthContext';

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
        <body>{children}</body>
      </AuthProvider>
    </html>
  )
}
