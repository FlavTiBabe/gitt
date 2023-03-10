// SearchBar.tsx

import React, { useState } from 'react';
import useGithubAPI from './useGithubAPI';

const RESULTS_PER_PAGE = 50;
const MAX_RESULTS = 1000;

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { results, resultCount, loading } = useGithubAPI(query, (currentPage - 1) * RESULTS_PER_PAGE, RESULTS_PER_PAGE);
  const totalResults = Math.min(resultCount, MAX_RESULTS);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery(event.currentTarget.value);
      setCurrentPage(1); // remettre à la page 1 lorsque j'effectue une nouvelle recherche
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / RESULTS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} onKeyDown={handleKeyDown} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Found {totalResults} results:</p>
          <ul>
            {results.map((result) => (
              <li key={result.url}>
                <a href={result.url}>
                  <h3>{result.name}</h3>
                </a>
                <p>{result.description}</p>
                <p>Stars: {result.stargazersCount}</p>
                <p>Forks: {result.forksCount}</p>
                <p>Watchers: {result.watchersCount}</p>
                <p>Language: {result.language}</p>
                <div>
                  <a href={result.owner.htmlUrl}>
                    <img src={result.owner.avatarUrl} alt={`${result.owner.login} avatar`} />
                  </a>
                  <p>Owner: {result.owner.login}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button disabled={currentPage === 1} onClick={handlePrevPage}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button disabled={currentPage === Math.ceil(totalResults / RESULTS_PER_PAGE)} onClick={handleNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
