from pydantic import BaseModel


class UserProfile(BaseModel):
    user_id: str

    min_budget: int
    max_budget: int

    trip_duration: int

    location_preferences: List[str]
