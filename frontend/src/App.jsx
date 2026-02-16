import { useState } from 'react'
import SearchTemplate from './components/templates/SearchTemplate'
import SearchSection from './components/organisms/SearchSection'
import FilterBar from './components/molecules/FilterBar'
import ResultsFeed from './components/organisms/ResultsFeed'
import EmptyResults from './components/organisms/EmptyResults'
import { getContextBadge } from './utils/flightUtils'

function App() {
  const [origin, setOrigin] = useState("LGA")
  const [cities, setCities] = useState("MIA, SFO")
  const [maxBudget, setMaxBudget] = useState(500)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("All")

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?origin=${origin}&cities=${cities}&min_budget=0&max_budget=${maxBudget}`);
      const data = await response.json();
      
      const enrichedResults = (data.results || []).map(flight => {
        const weather = flight.weather || (Math.random() > 0.5 ? "☀️ Sunny" : "⛅ Cloudy");
        const badge = getContextBadge(flight);
        return { ...flight, weather, category: flight.category || badge.label };
      });
      
      setResults(enrichedResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredResults = results.filter(flight => {
    if (filter === "All") return true;
    if (filter === "☀️ Sunny" || filter === "⛅ Cloudy") return flight.weather === filter;
    return flight.category === filter;
  });

  const categories = ["All", "💰 Best Value", "🎉 Weekend Escape", "⚡ Quick Trip", "👍 Recommended", "☀️ Sunny", "⛅ Cloudy"];

  return (
    <SearchTemplate>
      <SearchSection 
        origin={origin} setOrigin={setOrigin}
        cities={cities} setCities={setCities}
        maxBudget={maxBudget} setMaxBudget={setMaxBudget}
        onSearch={handleSearch}
        loading={loading}
      />

      {results.length > 0 && (
        <FilterBar 
          categories={categories}
          activeFilter={filter}
          onFilterChange={setFilter}
        />
      )}

      {filteredResults.length > 0 ? (
        <ResultsFeed flights={filteredResults} />
      ) : (
        !loading && (
          <EmptyResults 
            origin={origin}
            maxBudget={maxBudget}
            resultsFound={results.length > 0}
            filter={filter}
            onClearFilter={() => setFilter("All")}
          />
        )
      )}
    </SearchTemplate>
  )
}

export default App