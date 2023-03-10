// useGithubAPI.tsx

import { useState, useEffect } from 'react';

export type SearchResults = {
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
    const [currentQuery, setCurrentQuery] = useState("");
    const [resultCount, setResultCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [loadingNext , setLoadingNext] = useState(false);
    const [totalPages, setTotalPages] = useState<number|null>(null);
  
    useEffect(() => {
      if(query == "") return;
      if(totalPages == currentPage && query == currentQuery) return;

      if(query != currentQuery){ 
        setLoading(true);
        setResults([]);
      } else {
        setLoadingNext(true);
      }
      setCurrentQuery(query);
      console.log(currentPage);
      setTotalPages(currentPage);

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
        if(currentPage == 1){
        setResults(formattedData);
        setResultCount(data.total_count);
        } else {
         setResults((current)=> [...current, ...formattedData] ) 
        }
        setLoadingNext(false);
        setLoading(false);
      };
    
      fetchData();
    }, [query, currentPage, perPage]);
  
    return { results, resultCount, loading, totalPages , loadingNext};
  };



export default useGithubAPI;
