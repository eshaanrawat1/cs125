import json
from collections import defaultdict

INDEX_PATH = '../indices/budget.json'
BUCKET_SIZE = 100
K = 10


def load_index():
    with open(INDEX_PATH, 'r') as f:
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
    scores = {i:0 for i in range(n)}

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


def search(min_budget, max_budget, query_cities):
    index = load_index()

    buckets = get_buckets(min_budget, max_budget)
    flights = get_flights(index, buckets)
    c_index = city_index(flights)

    return rank_flights(
        flights=flights,
        city_index=c_index,
        query_cities=query_cities,
    )


def query():
    min_budget = int(input('What is your minimum budget in USD: '))
    max_budget = int(input('What is your maximum budget in USD: '))
    qc = input('Please enter a list of cities by their area code space separated: ').split()

    res = search(min_budget, max_budget, qc)
    print(res)


if __name__ == '__main__':
    query()