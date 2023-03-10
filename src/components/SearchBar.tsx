// SearchBar.tsx

import React, { useState } from 'react';
import useGithubAPI from '~/hooks/useGithubAPI';
import HoverCard from '~/components/HoverCard';
import { Github ,Search } from 'lucide-react';
import CardLoading from './CardLoading';

const RESULTS_PER_PAGE = 20;



const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [input , setInput] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { results, resultCount, loading  , loadingNext } = useGithubAPI(query, currentPage ,RESULTS_PER_PAGE);
  console.log(results);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key == "Escape") {
      event.preventDefault();
      setQuery(event.currentTarget.value);
      setCurrentPage(1); // remettre à la page 1 lorsque j'effectue une nouvelle recherche
    }
  };

  const handleSearch = () => {
    setQuery(input);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-8">
        <Github size="lg" className='text-slate-200'></Github>
        <h1 className="text-4xl text-slate-200 font-bold">GitHub Search</h1>
      </div>
      <div className="flex items-center w-62 px-6 py-3 mb-4  text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-400">
        <input
          type="text"
          className="bg-transparent outline-none text-slate-200"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your search query"
        />
        <button
          className=""
          onClick={handleSearch}
        >
          <Search className='text-slate-200 cursor-pointer h-full '/>
        </button>
      </div>
      {resultCount > 0 && (
        <p className="text-lg mb-2 text-slate-200">Found {resultCount} results:</p>
      )}
      <div className="w-full">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? loadingCreator() : results.map((result, i) => (
            <HoverCard key={result.url} i={i} {...result} />
          ))}
          {loadingNext && loadingCreator()}
        </div>
      </div>
      {results.length > 0 && results.length !== resultCount && !loadingNext && (
        <button
          className="w-72 h-12 px-4 text-lg text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleNextPage}
        >
          Show more
        </button>
      )}
    </div>
  );
};

const loadingCreator = () => {
  let result: JSX.Element[] = [];
  for (let index = 0; index < RESULTS_PER_PAGE; index++) {
    result.push(<CardLoading key={`searchLoading${index}`} />);
  }

  return result;
};

export default SearchBar;
