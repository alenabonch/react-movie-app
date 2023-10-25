import 'bootstrap/dist/css/bootstrap.css';

export const metadata = {
  title: 'Movie App',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/0267272fd2.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}