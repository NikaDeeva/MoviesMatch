from dataclasses import dataclass, field

@dataclass
class Movie:
    name: str
    year: int
    duration: int
    genre: list
    mood: str
    rating: int
    id: int
    poster: str = ""  