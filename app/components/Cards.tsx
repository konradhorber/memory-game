'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';


type UnsplashImage = {
    id: string;
    urls: {
        regular: string;
    };
    alt_description: string;
};

type GameScore = {
    currentScore: number;
    highScore: number;
    setCurrentScore: (score: number) => void;
    setHighScore: (score: number) => void;
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

function Cards({ currentScore, highScore, setCurrentScore, setHighScore }: GameScore) {
    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [imagesClicked, setImagesClicked] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleShuffle = () => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            shuffle(newImages);
            return newImages;
        });
    };

    const selectImage = (key: string) => {
        handleShuffle();
        if (!imagesClicked[key]) {
            imagesClicked[key] = 1;
            setCurrentScore(currentScore + 1);
            if (currentScore + 1 > highScore) {
                setHighScore(currentScore + 1);
            }
        } else {
            setImagesClicked({});
            setCurrentScore(0);
        }
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
                        onClick={() => selectImage(image.id)} 
                        className='flex flex-col items-center p-2'
                    >
                        <Image 
                            src={image.urls.regular}
                            width={200}
                            height={200}
                            alt={image.alt_description}
                            className='rounded-md object-cover w-full aspect-square shadow-md'
                        />
                        <h2 className='text-center mt-2'>{image.alt_description}</h2>
                    </div>
                ))
            ) : (
                <div>Loading or no images available</div>
            )}
        </div>
    );
}

export default Cards;
