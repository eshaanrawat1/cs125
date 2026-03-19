from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from search.budget_rank import search
from history_store import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/search")
def search_endpoint(
    cities: str = Query(..., description=""),
    origin: str = Query("LGA", description=""),
    min_budget: int = Query(0),
    max_budget: int = Query(10000),
    user_id: str = Query(..., description=""),
):
    try:
        dest_list = [c.strip() for c in cities.split(",")]

        history = load_history()
        append_history(history, user_id, origin, dest_list, min_budget, max_budget)
        top_destinations = get_top_destinations(history, user_id, exclude=dest_list)

        results = search(min_budget, max_budget, origin, dest_list)
        history_results = search(min_budget, max_budget, origin, top_destinations)[:5]
        

        return {
            "count": len(results),
            "results": results,
            "history_results": history_results,
            "history_destinations": top_destinations,
        }
    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e)}
