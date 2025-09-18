'use client';
import { Button } from '@/src/components/ui/button.jsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function HeroSection() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        'https://imgs.search.brave.com/iRjhiAuRJt-LANYbfN3CPn3XiGulpPGSazcul96O1vQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtY3NlLmNhbnZh/LmNvbS9ibG9iLzEy/MTg2NTUvZmVhdHVy/ZV9TdG9ja0ltYWdl/c19sZWFkXzAzMngu/anBn',
        'https://imgs.search.brave.com/K2llB2T_Z0Mrw7SE3I5Rxxq-HY0WIolLgA92mIsd3YQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvcHJv/ZmVzc2lvbmFscy9p/bWctYXJ0LndlYnA_/dz02MDA',
        // Add more images here...
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change the interval to 5000ms (5 seconds)

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Shine in Every Moment{' '}
                            <span className="gold-text-gradient">✨</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                            Gold &amp; Silver Accessories for Bold &amp; Beautiful Souls
                        </p>
                        <div className="flex flex-col sm:flex-col gap-4 justify-center lg:justify-start">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                                Shop Now
                            </Button>
                            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3">
                                View Collection
                            </Button>
                        </div>
                    </div>
                    <div className="image-slider relative w-3/4 z-40 h-45 lg:w-1/2 lg:h-96 overflow-hidden">
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt="Hero Image"
                                width={500}
                                height={500}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${index === currentImage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                                        />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}