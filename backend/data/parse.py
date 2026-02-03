import pandas as pd

ROW_LIMIT = 50000
PARSE_FLAG = True


def minimize(input_file, output_file):
    try:
        df = pd.read_csv(input_file, nrows=ROW_LIMIT)
        df.to_csv(output_file, index=False)
    except Exception as e:
        print(f"Error minimizing data: {e}")


def parse(input_file, output_file):
    df = pd.read_csv(input_file)

    col_drop = ['fareBasisCode', 'elapsedDays', 'isBasicEconomy', 'isRefundable', 'seatsRemaining']
    col_drop.extend([c for c in df.columns if c.startswith('segments')])

    try:
        df = df.drop(columns=col_drop)
        df.to_csv(output_file, index=False)
    except Exception as e:
        print(f"Error dropping columns: {e}")


if __name__ == "__main__":
    if PARSE_FLAG:
        # minimize("./processed_data.csv", "./minimzed_data.csv") 
        parse("./minimzed_data.csv", "./parsed_data.csv")

