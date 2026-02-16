import json
import os
from collections import defaultdict
from datetime import datetime, timedelta

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# Points to cs125_project/backend/indices/budget.json
INDEX_PATH = os.path.join(CURRENT_DIR, "..", "indices", "budget.json")
BUCKET_SIZE = 100
K = 10


def load_index():
    with open(INDEX_PATH, "r") as f:
        return json.load(f)


def get_buckets(min_budget, max_budget):
    start = (min_budget // BUCKET_SIZE) * BUCKET_SIZE
    end = (max_budget // BUCKET_SIZE) * BUCKET_SIZE

    buckets = []
    for lower in range(start, end + 1, BUCKET_SIZE):
        upper = lower + BUCKET_SIZE - 1
        buckets.append(f"{lower}_{upper}")
    return buckets


def get_flights(index, buckets):
    flights = []

    for b in buckets:
        if b not in index:
            continue

        flights.extend(index[b].copy())
    return flights


def city_index(flights):
    city_index = defaultdict(set)

    for id, flight in enumerate(flights):
        src = flight["src"].lower()
        dst = flight["dst"].lower()

        city_index[src].add(id)
        city_index[dst].add(id)

    return city_index


def rank_flights(flights, city_index, query_cities):
    if not flights:
        return []

    n = len(flights)
    scores = {i: 0 for i in range(n)}

    for c in query_cities:
        c = c.lower()
        if c not in city_index:
            continue

        for fid in city_index[c]:
            scores[fid] += 1

    ranked = sorted(scores.items(), key=lambda x: x[1])
    ranked = ranked[::-1][:K]

    res = []
    for fid, score in ranked[:K]:
        flight = flights[fid].copy()
        flight["score"] = score
        res.append(flight)
    return res


def search(min_budget, max_budget, origin_city, dest_cities):
    index = load_index()
    buckets = get_buckets(min_budget, max_budget)
    flights = get_flights(index, buckets)

    candidates_by_dest = defaultdict(list)
    origin = origin_city.strip().lower()
    destinations = [d.strip().lower() for d in dest_cities]

    # Current date in 2026
    now = datetime.now()

    for flight in flights:
        f_src = flight["src"].strip().lower()
        f_dst = flight["dst"].strip().lower()

        if f_src == origin and f_dst in destinations:
            # Shift 2022 dates to 2026 (approx 1400 days for Feb alignment)
            original_date = datetime.strptime(flight["date"], "%Y-%m-%d")
            shifted_date = original_date + timedelta(days=1400)

            # Only show flights occurring after today
            if shifted_date < now:
                continue

            try:
                price = float(flight["totalFare"])
                score = 10000 / (price + 1)
            except:
                score = 0

            flight_copy = flight.copy()
            flight_copy["score"] = round(score, 2)
            # OVERWRITE the date string for the frontend
            flight_copy["date"] = shifted_date.strftime("%Y-%m-%d")
            
            # Add mock weather
            import random
            flight_copy["weather"] = "☀️ Sunny" if random.random() > 0.5 else "⛅ Cloudy"
            
            # Add category logic (moved from frontend for consistency)
            duration_str = flight.get("duration", "")
            match = __import__("re").search(r"(\d+)H", duration_str)
            hours = int(match.group(1)) if match else 0
            
            day = shifted_date.weekday() # 0 is Monday, 4 is Friday, 5 is Saturday
            
            if day >= 4: # Friday, Saturday, Sunday (approx weekend)
                flight_copy["category"] = "🎉 Weekend Escape"
            elif hours > 0 and hours < 3:
                flight_copy["category"] = "⚡ Quick Trip"
            elif score > 50:
                flight_copy["category"] = "💰 Best Value"
            elif price < 300:
                flight_copy["category"] = "👍 Recommended"
            else:
                flight_copy["category"] = "✈️ Available"

            candidates_by_dest[f_dst].append(flight_copy)

    for dest in candidates_by_dest:
        candidates_by_dest[dest].sort(key=lambda x: x["score"], reverse=True)

    final_results = []
    while len(final_results) < 20 and any(candidates_by_dest.values()):
        for dest in destinations:
            if candidates_by_dest[dest]:
                final_results.append(candidates_by_dest[dest].pop(0))
                if len(final_results) >= 20:
                    break
    return final_results


def query():
    min_budget = int(input("What is your minimum budget in USD: "))
    max_budget = int(input("What is your maximum budget in USD: "))
    qc = input(
        "Please enter a list of cities by their area code space separated: "
    ).split()

    res = search(min_budget, max_budget, qc)
    print(res)


if __name__ == "__main__":
    query()
