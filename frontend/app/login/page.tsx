'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { login } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser } = useStore()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ email, password })
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      })
      router.push('/designs')
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 hidden lg:block relative">
        <Image
          src="/placeholder.svg"
          alt="Login"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="btn-hover"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="btn-hover"
              />
            </div>
            <Button type="submit" className="w-full btn-hover">Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

