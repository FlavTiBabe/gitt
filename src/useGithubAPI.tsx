// useGithubAPI.tsx

import { useState, useEffect } from 'react';

type SearchResults = {
  name: string;
  description: string;
  url: string;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  language: string;
  owner: {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };
};

type SearchResponse = {
  items: SearchResults[];
  total_count: number;
};

const useGithubAPI = (query: string, currentPage: number, perPage: number) => {
    const [results, setResults] = useState<SearchResults[]>([]);
    const [resultCount, setResultCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0);
  
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${currentPage}`);
        const data: SearchResponse = await response.json();
        const formattedData = data.items.map((item: any) => ({
          name: item.name,
          description: item.description,
          url: item.html_url,
          stargazersCount: item.stargazers_count,
          forksCount: item.forks_count,
          watchersCount: item.watchers_count,
          language: item.language,
          owner: {
            login: item.owner.login,
            avatarUrl: item.owner.avatar_url,
            htmlUrl: item.owner.html_url,
          },
        }));
        setResults(formattedData);
        setResultCount(data.total_count);
        setTotalPages(Math.ceil(data.total_count / perPage));
        setLoading(false);
      };
      fetchData();
    }, [query, currentPage, perPage]);
  
    return { results, resultCount, loading, totalPages };
  };
export default useGithubAPI;
