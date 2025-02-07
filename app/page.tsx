import Cards from './components/Cards';

export default function Home() {
  return (
    <div>
      <header className='flex flex-row justify-between items-center p-4'>
        <h1 className='text-xl font-bold'>Get points by clicking on an image but don't click on any more than once!</h1>
        <div className='mr-8 p-2 border rounded-md'>
          <p>Points: 0</p>
          <p>High Score: 0</p> 
        </div>
      </header>
      <Cards />
    </div>
  );
}
