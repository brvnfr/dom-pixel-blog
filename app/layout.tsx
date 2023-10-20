
import Header from '@/components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import { TProvider } from '@/providers/toast-provider'
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Blog App with Nextjs 13',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <head>
      <ColorSchemeScript />
      </head>
      <body className={inter.className}>
      <MantineProvider>
        <TProvider/>
        <Header currentUser={currentUser}/>
        {children}
        </MantineProvider>
        </body>
    </html>
  )
}
