import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def generate_itinerary(destination: str, date: str, num_days: int = 3):
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    Generate a highly detailed and immersive {num_days}-day travel itinerary for {destination} starting on {date}.
    The plan should include a mix of famous landmarks, local hidden gems, authentic culinary experiences, and cultural immersion.
    
    The response MUST be a valid JSON object with the following structure:
    {{
      "destination": "{destination}",
      "start_date": "{date}",
      "days": [
        {{
          "day": 1,
          "title": "...",
          "activities": [
            {{"time": "Morning", "label": "Culture", "description": "..."}},
            {{"time": "Afternoon", "label": "Exploration", "description": "..."}},
            {{"time": "Evening", "label": "Dining", "description": "..."}}
          ]
        }}
        // ... (repeat for day 2, 3, up to day {num_days})
      ],
      "tips": ["...", "..."]
    }}
    Provide exactly {num_days} days. Provide only the JSON. No preamble, no markdown formatting.
    """
    
    try:
        response = model.generate_content(prompt)
        # Handle potential markdown code blocks in Gemini's response
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
            
        return json.loads(text)
    except Exception as e:
        print(f"Error generating itinerary: {e}")
        # Dynamic fallback for any number of days
        fallback_days = []
        for d in range(1, num_days + 1):
            fallback_days.append({
                "day": d,
                "title": f"Exploring {destination} - Phase {d}",
                "activities": [
                    {"time": "Morning", "label": "Discovery", "description": f"Explore the local area around your accommodation in {destination} and find a charming local café for breakfast."},
                    {"time": "Afternoon", "label": "Landmarks", "description": f"Visit a major cultural or historical landmark to understand the local heritage of Day {d}."},
                    {"time": "Evening", "label": "Dining", "description": "Dine at a highly recommended local restaurant and enjoy the evening atmosphere."}
                ]
            })

        return {
            "destination": destination,
            "start_date": date,
            "days": fallback_days,
            "tips": [
                "Always carry a reusable water bottle and stay hydrated.",
                "Use public transport or walk to discover hidden corners of the city.",
                "Learn a few basic phrases in the local language to connect with residents.",
                "Keep a digital copy of your travel documents and itinerary."
            ]
        }
