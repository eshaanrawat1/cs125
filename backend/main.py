from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

# Import your teammate's logic
from search.budget_rank import search

app = FastAPI()

# 1. Allow React to talk to this (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/search")
def search_endpoint(
    cities: str = Query(..., description="Comma separated list of TARGET destinations"),
    origin: str = Query("LGA", description="Where the user is starting"),
    min_budget: int = Query(0),
    max_budget: int = Query(10000),
):
    try:
        dest_list = [c.strip() for c in cities.split(",")]

        results = search(min_budget, max_budget, origin, dest_list)

        return {"count": len(results), "results": results}
    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e)}


# To run this: uvicorn main:app --reload
