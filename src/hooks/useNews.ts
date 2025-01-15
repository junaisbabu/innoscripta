import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

export interface UseNewsReturn<T> {
  articles: T[];
  setArticles: Dispatch<SetStateAction<T[]>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  personalizedSources: string;
  setPersonalizedSources: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function useNews<T>(): UseNewsReturn<T> {
  const [articles, setArticles] = useState<T[]>([]);
  const [query, setQuery] = useState("apple");
  const [category, setCategory] = useState("all");
  const [date, setDate] = useState("");
  const [personalizedSources, setPersonalizedSources] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return {
    articles,
    setArticles,
    query,
    setQuery,
    category,
    setCategory,
    date,
    setDate,
    personalizedSources,
    setPersonalizedSources,
    isLoading,
    setIsLoading,
  };
}

export default useNews;
