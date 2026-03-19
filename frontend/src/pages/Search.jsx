import { useEffect, useState } from 'react'
import SearchTemplate from '@/components/templates/SearchTemplate'
import SearchSection from '@/components/organisms/SearchSection'
import FilterBar from '@/components/molecules/FilterBar'
import ResultsFeed from '@/components/organisms/ResultsFeed'
import EmptyResults from '@/components/organisms/EmptyResults'
import { getContextBadge } from '@/utils/flightUtils'
import Typography from '@/components/atoms/Typography'
import { supabase } from '@/utils/supabaseClient'

function Search() {
  const [origin, setOrigin] = useState("LGA")
  const [cities, setCities] = useState("MIA, SFO")
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(500);
  const [results, setResults] = useState([])
  const [historyResults, setHistoryResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filter, setFilter] = useState("All")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    fetchUser()
  }, [])

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      if (!userId) {
        console.error("User not loaded yet.")
        return;
      }
      const response = await fetch(
        `http://127.0.0.1:8000/search?origin=${origin}&cities=${cities}&min_budget=${minBudget}&max_budget=${maxBudget}&user_id=${userId}`
      );
      const data = await response.json();
      
      const enrichedResults = (data.results || []).map(flight => {
        const weather = flight.weather || (Math.random() > 0.5 ? "☀️ Sunny" : "⛅ Cloudy");
        const badge = getContextBadge(flight);
        return { ...flight, weather, category: flight.category || badge.label };
      });

      const enrichedHistoryResults = (data.history_results || []).map(flight => {
        const weather = flight.weather || (Math.random() > 0.5 ? "☀️ Sunny" : "⛅ Cloudy");
        const badge = getContextBadge(flight);
        return { ...flight, weather, category: flight.category || badge.label };
      });
      
      setResults(enrichedResults);
      setHistoryResults(enrichedHistoryResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const applyFilter = (list) => list.filter(flight => {
    if (filter === "All") return true;
    if (filter === "☀️ Sunny" || filter === "⛅ Cloudy") return flight.weather === filter;
    return flight.category === filter;
  });

  const filteredResults = applyFilter(results)
  const filteredHistoryResults = applyFilter(historyResults)

  const categories = ["All", "💰 Best Value", "🎉 Weekend Escape", "⚡ Quick Trip", "👍 Recommended", "☀️ Sunny", "⛅ Cloudy"];
  return (
    <SearchTemplate>
      <SearchSection 
        origin={origin} setOrigin={setOrigin}
        cities={cities} setCities={setCities}
        minBudget={minBudget} setMinBudget={setMinBudget} // ADDED THIS
        maxBudget={maxBudget} setMaxBudget={setMaxBudget}
        onSearch={handleSearch}
        loading={loading}
      />

      {(results.length > 0 || historyResults.length > 0) && (
        <FilterBar 
          categories={categories}
          activeFilter={filter}
          onFilterChange={setFilter}
        />
      )}

      {filteredResults.length > 0 ? (
        <div className="space-y-4">
          <Typography variant="h3">Recommended For You</Typography>
          <ResultsFeed flights={filteredResults} />
        </div>
      ) : (
        hasSearched && !loading && filteredResults.length === 0 && (
          <EmptyResults 
            origin={origin}
            minBudget={minBudget} // ADDED THIS
            maxBudget={maxBudget}
            resultsFound={results.length > 0}
            filter={filter}
            onClearFilter={() => setFilter("All")}
          />
        )
      )}

      {filteredHistoryResults.length > 0 && (
        <div className="space-y-4">
          <Typography variant="h3">Based on Your History</Typography>
          <ResultsFeed flights={filteredHistoryResults} />
        </div>
      )}
    </SearchTemplate>
  )
}

export default Search;
