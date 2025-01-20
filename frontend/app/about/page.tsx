import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">About Shirt Customizer</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="mb-4">
            Welcome to Shirt Customizer, your premier destination for unique, personalized shirt designs. Since 2025, we've been empowering individuals and businesses to express their creativity through custom apparel.
          </p>
          <p className="mb-4">
            Our platform offers a range of features designed to make your shirt customization experience seamless and enjoyable:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-primary">Browse public designs for inspiration</li>
            <li className="text-primary">Create your own designs with our user-friendly design tool</li>
            <li className="text-primary">Choose from a variety of shirt colors and styles</li>
            <li className="text-primary">Share your designs with the community</li>
            <li className="text-primary">Easy ordering and secure checkout process</li>
          </ul>
          <p>
            Whether you're creating a unique piece for yourself, designing team uniforms, or launching a new merchandise line, shirt Customizer is here to bring your vision to life.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg animate-scale">
          <Image
            src="/placeholder.svg"
            alt="About shirt Customizer"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

