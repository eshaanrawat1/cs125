from pydantic import BaseModel


class UserProfile(BaseModel):
    user_id: str
    min_budget: int
    max_budget: int
    trip_duration: int
    location_preferences: List[str]

    def __str__(self):
        res = "User created with the following params:\n"

        res += f'user_id: {user_id}\n'
        res += f'min_budget: {min_budget}\n'
        res += f'max_budget: {max_budget}\n'
        res += f'trip_duration: {trip_duration}\n'
        res += f'location_preferences: {location_preferences}\n'
        return res
