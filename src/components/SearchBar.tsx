// SearchBar.tsx

import React, { useState } from 'react';
import useGithubAPI from '~/hooks/useGithubAPI';
import HoverCard from '~/components/HoverCard';

const RESULTS_PER_PAGE = 100;
const MAX_RESULTS = 100;



const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [input , setInput] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { results, resultCount, loading } = useGithubAPI(query, currentPage ,RESULTS_PER_PAGE);
  const totalResults = Math.min(resultCount, MAX_RESULTS);
  console.log(results);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery(event.currentTarget.value);
      setCurrentPage(1); // remettre à la page 1 lorsque j'effectue une nouvelle recherche
    }
  };

  const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
      
          <p>Found {resultCount} results:</p>
          <main className='flex flex-col gap-5  w-screen justify-center'>
            {results.map((result) => (
              <section key={result.url}>
                <HoverCard {...result}></HoverCard>
              </section>
            ))}
          </main>
          <div className='w-screen flex justify-center'>
            <button className="h-[70px] text-lg bg-blue-400 border-4 text-white border-black rounded-md" onClick={()=>handleNextPage()}>Show more</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
