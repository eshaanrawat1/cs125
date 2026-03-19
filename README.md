# Travel Recommendation App

A recommendation engine for students to get travel recommendations 
based on contextual factors such as budget preferences, travel destinations, schedule constraints, and more.

## Backend Setup

Create virtual environment in /backend: This will be used to 
store all dependencies like FastAPI. 

```
python3 -m venv .venv
source .venv/bin/activate [.venv\Scripts\activate on Windows]
```

Then, install requirements

```
pip install -r requirements.txt
```

## Frontend Setup

Open a terminal in /frontend and run this command:

```
npm install
```

## Running the application

Open a terminal in the backend virtual environment and run this command to start the backend server:

```
uvicorn main:app --reload
```

Open a terminal in the frontend folder and run this command to start the frontend:

```
npm run dev
```

