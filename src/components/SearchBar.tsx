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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub logo"
          className="w-48"
        />
        <h1 className="text-4xl font-bold">GitHub Search</h1>
      </div>
      <input
        type="text"
        className="w-full px-4 py-2 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your search query"
      />

      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <>
          <p className="text-lg mb-2">Found {resultCount} results:</p>
          <div className="w-full">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <HoverCard key={result.url} {...result} />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="w-full h-12 px-4 text-lg text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleNextPage}
            >
              Show more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;