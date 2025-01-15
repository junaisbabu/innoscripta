import { useEffect } from "react";
import useNews from "../hooks/useNews";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Loading from "./Loading";

interface Article {
  _id: string;
  snippet: string;
  headline: {
    main: string;
  };
  byline: {
    person?: {
      firstname: string;
      lastname: string;
    }[];
  };
  pub_date: string;
}

function NYTimes() {
  const {
    articles,
    setArticles,
    query,
    setQuery,
    category,
    setCategory,
    date,
    setDate,
    isLoading,
    setIsLoading,
  } = useNews<Article>();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${
          import.meta.env.VITE_NYTIMES_API_KEY
        }`;

        if (query) url += `&q=${query}`;
        if (category !== "all") url += `&sort=${category}`;
        if (date) url += `&begin_date=${date}`;

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.response.docs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [query, category, date]);
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
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label>From</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label>Sort</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6">
              {articles.map(({ _id, byline, headline, pub_date, snippet }) => {
                let author = "";
                const person = byline.person;
                if (person?.length) {
                  author =
                    person[0]?.firstname + " " + person[0]?.lastname || "";
                }
                return (
                  <Feed
                    key={_id}
                    title={headline.main}
                    description={snippet}
                    author={author || ""}
                    publishedAt={pub_date}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NYTimes;
