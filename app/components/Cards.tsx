'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type UnsplashImage = {
    id: string;
    urls: {
        small: string;
    };
    alt_description: string;
};

function shuffle(array: UnsplashImage[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function Cards() {
    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleShuffle = () => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            shuffle(newImages);
            return newImages;
        });
    };

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch('/api/images');
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const data = await response.json();
                setImages(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching images');
            } finally {
                setIsLoading(false);
            }
        }
        fetchImages();
    }, []);

    const displayedImages = images.slice(0, 8);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {displayedImages && displayedImages.length > 0 ? (
                displayedImages.map((image) => (
                    <div 
                        key={image.id}
                        onClick={handleShuffle} 
                        className='flex flex-col items-center p-2'
                    >
                        <Image 
                            src={image.urls.small}
                            width={200}
                            height={200}
                            alt={image.alt_description}
                            className='rounded-md object-cover aspect-square w-[200px] h-[200px]'
                        />
                        <h2>{image.alt_description}</h2>
                    </div>
                ))
            ) : (
                <div>Loading or no images available</div>
            )}
        </div>
    );
}

export default Cards;