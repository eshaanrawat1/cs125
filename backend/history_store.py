import json
import os
from collections import Counter
from datetime import datetime

HISTORY_PATH = "data/query_history.json"
MAX_HISTORY = 5
TOP_K = 5


def load_history():
    try:
        with open(HISTORY_PATH, "r") as f:
            return json.load(f)
    except Exception:
        return {}


def save_history(history):
    with open(HISTORY_PATH, "w") as f:
        json.dump(history, f)


def _get_user_queries(history, user_id):
    user_entry = history.get(user_id)

    if user_entry is None:
        return []

    return user_entry.get("queries", [])


def _set_user_queries(history, user_id, queries):
    history[user_id] = {"queries": queries}


def append_history(history, user_id, origin, cities, min_budget, max_budget):
    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "origin": origin,
        "cities": cities,
        "min_budget": min_budget,
        "max_budget": max_budget,
    }

    user_history = _get_user_queries(history, user_id)
    user_history.append(entry)
    _set_user_queries(history, user_id, user_history[-MAX_HISTORY:])
    save_history(history)


def get_top_destinations(history, user_id, exclude=None):
    try:
        exclude_set = {c.strip().lower() for c in exclude}
    except:
        exclude_set = set()

    user_history = _get_user_queries(history, user_id)
    cnt = Counter()

    for entry in user_history:
        for c in entry.get("cities", []):
            c_norm = c.strip().lower()
            if c_norm and c_norm not in exclude_set:
                cnt[c_norm] += 1
    return [c.upper() for c, _ in cnt.most_common(TOP_K)]


def get_destination_counts(history, user_id):
    user_history = _get_user_queries(history, user_id)
    cnt = Counter()

    for entry in user_history:
        for c in entry.get("cities", []):
            c_norm = c.strip().lower()
            if c_norm:
                cnt[c_norm] += 1
    return cnt
