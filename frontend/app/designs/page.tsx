'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import axios from 'axios'

export default function DesignsPage() {
  const [designs, setDesigns] = useState([]) // Store designs from the backend
  const [page, setPage] = useState(1) // Pagination state
  const [hasMore, setHasMore] = useState(true) // If more designs are available
  const { user } = useStore() // Current authenticated user
  const { toast } = useToast() // Toast for notifications

  useEffect(() => {
    fetchDesigns()
  }, [page])

  // Fetch public designs from the backend
  const fetchDesigns = async () => {
    try {
      const response = await axios.get(`/api/designs/public`, {
        params: { page, limit: 10 },
      })

      const { docs, hasMore } = response.data.data // Adjusted to match your backend response
      setDesigns((prevDesigns) => [...prevDesigns, ...docs]) // Append designs to the state
      setHasMore(hasMore) // Update if more designs are available
    } catch (error) {
      console.error('Error fetching designs:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch designs. Please try again.',
        variant: 'destructive',
      })
    }
  }

  // Toggle like for a design
  const handleLike = async (designId) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to like designs.',
        variant: 'destructive',
      })
      return
    }

    try {
      // Toggle like on the backend
      await axios.post(`/api/likes/${designId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${user.accessToken}` }, // Pass the user's access token
      })

      // Update the like count after toggling
      const response = await axios.get(`/api/likes/${designId}/count`)
      const updatedLikeCount = response.data.data.likeCount

      // Update the design in the local state
      setDesigns((prevDesigns) =>
        prevDesigns.map((design) =>
          design._id === designId ? { ...design, likes: updatedLikeCount } : design
        )
      )
    } catch (error) {
      console.error('Error toggling like:', error)
      toast({
        title: 'Error',
        description: 'Failed to like the design. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Public Designs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designs.map((design) => (
          <Card key={design._id}>
            <CardContent className="p-4">
              <Image
                src={design.designLink || "/placeholder.svg"} // Handle missing images
                alt={design.name}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-md"
              />
              <h2 className="mt-2 text-lg font-semibold">{design.name}</h2>
              <p className="text-sm text-muted-foreground">Color: {design.color}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span>{design.likes || 0} likes</span>
              {user && (
                <Button variant="outline" size="sm" onClick={() => handleLike(design._id)}>
                  Like
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <Button onClick={() => setPage((prevPage) => prevPage + 1)}>Load More</Button>
        </div>
      )}
    </div>
  )
}
