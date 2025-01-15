import { UseNewsReturn } from "../hooks/useNews";

function Customize<T>({
  category,
  setCategory,
  query,
  setQuery,
  date,
  setDate,
  personalizedSources,
  setPersonalizedSources,
}: UseNewsReturn<T>) {
  return (
    <div className="flex space-x-4 mb-4">
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
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
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
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col">
        <label>Source</label>
        <select
          value={personalizedSources}
          onChange={(e) => setPersonalizedSources(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="newsapi">NewsAPI</option>
        </select>
      </div>
    </div>
  );
}

export default Customize;
