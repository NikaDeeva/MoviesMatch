from dataclasses import dataclass, field
# from random import randint

@dataclass
class Movie:
    name: str
    year: int
    duration: int
    genre: list
    mood: str
    rating: int
    id: int
    