'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({ username, email, fullname, password })
      toast({
        title: 'Registration Successful',
        description: 'You can now login with your new account.',
      })
      router.push('/login')
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Please check your information and try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 hidden lg:block relative">
        <Image
          src="/placeholder.svg"
          alt="Register"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="btn-hover"
              />
            </div>
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
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
            <Button type="submit" className="w-full btn-hover">Register</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

