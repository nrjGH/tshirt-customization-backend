import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';
import { Carousel } from '../components/Carousel';

const topDesigns = [
  { id: 1, name: 'Cool Design 1', image: '/placeholder.svg' },
  { id: 2, name: 'Awesome Design 2', image: '/placeholder.svg' },
  { id: 3, name: 'Creative Design 3', image: '/placeholder.svg' },
  { id: 4, name: 'Unique Design 4', image: '/placeholder.svg' },
  { id: 5, name: 'Trendy Design 5', image: '/placeholder.svg' },
];

const HomePage: React.FC = () => {
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle the signup logic
    toast({
      title: "Sign up successful!",
      description: "Welcome to Shirt Customizer!",
    });
  };

  return (
    <div className="space-y-12">
      <section className="bg-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Top Designs</h2>
        <Carousel items={topDesigns} />
      </section>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Welcome to Shirt Customizer</h1>
        <p className="text-xl text-muted-foreground">
          Get ready to explore endless possibilities in shirt design. 
          Create unique, personalized shirts that express your style and creativity.
        </p>
        <p className="text-lg">
          Whether you're designing for yourself, your team, or your brand, 
          Shirt Customizer provides the tools you need to bring your ideas to life.
        </p>
      </section>

      <section className="bg-accent rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up Now</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <Input type="email" placeholder="Enter your email" required />
          <Button type="submit" className="w-full">Join Shirt Customizer</Button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;

