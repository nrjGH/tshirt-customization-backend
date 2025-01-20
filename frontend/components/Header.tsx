'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  const pathname = usePathname()
  const { user, logout, cart } = useStore()

  return (
    <header className="bg-secondary shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo-placeholder.svg" alt="Logo" width={40} height={40} />
          <span className="logo animate-fade-in text-gradient">Shirt Customizer</span>
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/designs" className={`link-hover ${pathname === '/designs' ? 'text-primary' : 'text-foreground'}`}>
              Designs
            </Link>
          </li>
          <li>
            <Link href="/about" className={`link-hover ${pathname === '/about' ? 'text-primary' : 'text-foreground'}`}>
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/design" className={`link-hover ${pathname === '/design' ? 'text-primary' : 'text-foreground'}`}>
                  Create
                </Link>
              </li>
              <li>
                <Link href="/profile" className={`link-hover ${pathname === '/profile' ? 'text-primary' : 'text-foreground'}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Button variant="ghost" onClick={logout} className="btn-hover animate-scale">Logout</Button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className={`link-hover ${pathname === '/login' ? 'text-primary' : 'text-foreground'}`}>
                Login
              </Link>
            </li>
          )}
          <li>
            <Link href="/cart" className="relative animate-scale">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

