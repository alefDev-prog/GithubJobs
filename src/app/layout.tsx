import 'bootstrap/dist/css/bootstrap.css';
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
      <body>{children}</body>
    </html>
  )
}
