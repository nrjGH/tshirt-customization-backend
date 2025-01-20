import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface CarouselItem {
  id: number;
  name: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-64 object-cover" />
              <p className="text-center mt-2 font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevSlide}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button variant="outline" className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextSlide}>
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

