# Creates index by budget

import csv
import json
from collections import defaultdict


CSV_PATH = '../data/parsed_data.csv'
OUT_PATH = '../indices/budget.json'
BUCKET_SIZE = 100


def find_bucket(price):
    lower = price // BUCKET_SIZE * BUCKET_SIZE
    upper = lower + BUCKET_SIZE - 1
    return f"{int(lower)}_{int(upper)}"


def build_index():
    index = defaultdict(list)

    with open(CSV_PATH, 'r') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            try:
                cost = float(row["totalFare"])
            except:
                continue

            bucket = find_bucket(cost)
            index[bucket].append({
                "date": row["flightDate"],
                "src": row["startingAirport"],
                "dst": row["destinationAirport"],
                "duration": row["travelDuration"],
            })
    return index


def save_index(index):
    with open(OUT_PATH, 'w') as f:
        json.dump(index, f)


if __name__ == '__main__':
    index = build_index()
    save_index(index)
    print('Index saved!')