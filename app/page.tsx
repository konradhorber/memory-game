'use client';

import Cards from './components/Cards';
import { useState } from 'react';

export default function Home() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div>
      <header className='flex flex-col justify-between items-center p-4'>
        <h1 className='text-xl font-bold'>Get points by clicking on an image but don&apos;t click on any more than once!</h1>
        <div className='flex flex-row'>
          <p className='mr-4'>Points: {currentScore}</p>
          <p>High Score: {highScore}</p> 
        </div>
      </header>
      <Cards 
        currentScore={currentScore}
        highScore={highScore}
        setCurrentScore={setCurrentScore}
        setHighScore={setHighScore}
      />
    </div>
  );
}
