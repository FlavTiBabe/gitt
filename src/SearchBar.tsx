// SearchBar.tsx

import React, { useState } from 'react';
import useGithubAPI from './useGithubAPI';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { results, totalResults, loading } = useGithubAPI(query, currentPage);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery(event.currentTarget.value);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
          {results.length > 0 && (
            <button onClick={handleNextPage} disabled={results.length < 10}>
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
