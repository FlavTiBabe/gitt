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

const useGithubAPI = (query: string, page: number) => {
    const [results, setResults] = useState<SearchResults[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      setLoading(true);
      const perPage = 30; // Nombre de résultats par page
      const fetchData = async () => {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`);
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
        setTotalResults(data.total_count);
        setLoading(false);
      };
      fetchData();
    }, [query, page]);
  
    return { results, totalResults, loading };
  };

export default useGithubAPI;
