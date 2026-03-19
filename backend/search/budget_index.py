import csv
import json
import os
from collections import defaultdict


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# Points to backend/data/parsed_data.csv
CSV_PATH = os.path.join(CURRENT_DIR, "..", "data", "parsed_data.csv")
# Points to backend/indices/budget.json
OUT_PATH = os.path.join(CURRENT_DIR, "..", "indices", "budget.json")
BUCKET_SIZE = 100


def find_bucket(price):
    lower = price // BUCKET_SIZE * BUCKET_SIZE
    upper = lower + BUCKET_SIZE - 1
    return f"{int(lower)}_{int(upper)}"


def build_index():
    index = defaultdict(list)

    with open(CSV_PATH, "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            try:
                cost = float(row["totalFare"])
            except:
                continue

            bucket = find_bucket(cost)
            index[bucket].append(
                {
                    "date": row["flightDate"],
                    "src": row["startingAirport"],
                    "dst": row["destinationAirport"],
                    "duration": row["travelDuration"],
                    "totalFare": row["totalFare"],
                }
            )
    return index


def save_index(index):
    with open(OUT_PATH, "w") as f:
        json.dump(index, f)


if __name__ == "__main__":
    index = build_index()
    save_index(index)
    print("Index saved!")
