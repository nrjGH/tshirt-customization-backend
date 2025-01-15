'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, logout } = useStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="space-y-4">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.fullname}</p>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </div>
  )
}

