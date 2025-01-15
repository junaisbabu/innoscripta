import { useEffect } from "react";
import Feed from "./Feed";
import useNews from "../hooks/useNews";
import Navbar from "./Navbar";
import Loading from "./Loading";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
  author: string;
}

function NewsAPI() {
  const {
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
  } = useNews<Article>();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        let url = `https://newsapi.org/v2/everything?apiKey=${
          import.meta.env.VITE_NEWSAPI_API_KEY
        }`;

        if (query) url += `&q=${query}`;
        if (category !== "all") url += `&category=${category}`;
        if (date) url += `&from=${date}`;
        if (!personalizedSources.includes("all")) {
          url += `&sources=${personalizedSources}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [query, category, date, personalizedSources]);

  return (
    <div>
      <div className="w-full flex">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="w-full md:w-[calc(100%-208px)] ml-auto">
          <div className="flex gap-4 sticky top-0 bg-white md:justify-center p-2 shadow flex-wrap">
            <div className="flex flex-col">
              <label>Search Keyword</label>
              <input
                type="Query`"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 border rounded h-8"
              />
            </div>
            <div className="flex flex-col">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-1 border rounded h-8"
              >
                <option value="all">All</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>From</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-1 border rounded h-8"
              />
            </div>

            <div className="flex flex-col">
              <label>Source</label>
              <select
                value={personalizedSources}
                onChange={(e) => setPersonalizedSources(e.target.value)}
                className="p-1 border rounded h-8"
              >
                <option value="newsapi">NewsAPI</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6">
              {articles?.map(
                ({ author, title, description, publishedAt, urlToImage }) => {
                  return (
                    <Feed
                      author={author}
                      title={title}
                      description={description}
                      publishedAt={publishedAt}
                      photo={urlToImage}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsAPI;
