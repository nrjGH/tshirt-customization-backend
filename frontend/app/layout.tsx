import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shirt Customizer',
  description: 'Create and customize your own Shirt designs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient text-foreground min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
        <div className="fixed bottom-4 right-4 z-50">
          <Image src="/logo-placeholder.svg" alt="Logo" width={40} height={40} className="animate-fade-in" />
        </div>
      </body>
    </html>
  )
}

