'use client'

import { useState, useEffect } from 'react'
import { getPublicDesigns, toggleLike, getLikeCount } from '@/lib/api'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function DesignsPage() {
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { user } = useStore()
  const { toast } = useToast()

  useEffect(() => {
    fetchDesigns()
  }, [page])

  const fetchDesigns = async () => {
    try {
      const response = await getPublicDesigns(page)
      setDesigns((prevDesigns) => [...prevDesigns, ...response.data.designs])
      setHasMore(response.data.hasMore)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch designs. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleLike = async (designId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to like designs.',
        variant: 'destructive',
      })
      return
    }

    try {
      await toggleLike(designId)
      const updatedLikeCount = await getLikeCount(designId)
      setDesigns((prevDesigns) =>
        prevDesigns.map((design) =>
          design.id === designId ? { ...design, likes: updatedLikeCount.data.count } : design
        )
      )
    } catch (error) {
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
          <Card key={design.id}>
            <CardContent className="p-4">
              <Image
                src={design.designLink || "/placeholder.svg"}
                alt={design.name}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-md"
              />
              <h2 className="mt-2 text-lg font-semibold">{design.name}</h2>
              <p className="text-sm text-muted-foreground">Color: {design.color}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span>{design.likes} likes</span>
              {user && (
                <Button variant="outline" size="sm" onClick={() => handleLike(design.id)}>
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

