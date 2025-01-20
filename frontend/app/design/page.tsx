'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'

export default function DesignToolPage() {
  const [color, setColor] = useState('black')
  const [design, setDesign] = useState('')
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you would handle the design submission in the future
    console.log({ color, design, name, isPublic })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Design Your Shirt</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="color">Shirt Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className="btn-hover">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="pastel-pink">Pastel Pink</SelectItem>
                  <SelectItem value="pastel-blue">Pastel Blue</SelectItem>
                  <SelectItem value="pastel-green">Pastel Green</SelectItem>
                  <SelectItem value="pastel-yellow">Pastel Yellow</SelectItem>
                  <SelectItem value="pastel-purple">Pastel Purple</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="design">Upload Design</Label>
              <Input
                id="design"
                type="file"
                accept="image/*"
                onChange={(e) => setDesign(e.target.files?.[0]?.name || '')}
                className="btn-hover"
              />
            </div>
            <div>
              <Label htmlFor="name">Design Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter design name"
                className="btn-hover"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public">Make design public</Label>
            </div>
            <Button type="submit" className="w-full btn-hover">Save Design</Button>
          </form>
        </div>
        <div className="bg-secondary rounded-lg p-4 flex items-center justify-center">
          <div
            className="w-3/4 h-[400px] rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: color === 'white' ? '#ffffff' : color.startsWith('pastel') ? `var(--color-${color})` : color }}
          >
            {design ? (
              <Image
                src="/placeholder.svg"
                alt="Design Preview"
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <p className="text-muted-foreground">Design Preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

