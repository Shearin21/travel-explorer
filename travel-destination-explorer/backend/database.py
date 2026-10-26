"""SQLite setup: creates the table and inserts sample data (without duplicates)."""
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "destinations.db"

SAMPLE_DESTINATIONS = [
    ("Ooty", "Tamil Nadu, India", "Mountains",
     "The 'Queen of Hill Stations' with tea gardens, lakes and cool weather.",
     "Ooty (Udhagamandalam) sits in the Nilgiri Hills. Enjoy the Nilgiri Mountain Railway toy train, the Botanical Gardens, Ooty Lake boating and endless tea estates. Its cool climate makes it a favourite family getaway.",
     "Rs 12,000 - 20,000 (4 days, per person)", "October to June", "/images/ooty.jpg"),
    ("Munnar", "Kerala, India", "Nature",
     "Rolling tea plantations and misty green valleys in the Western Ghats.",
     "Munnar is known for endless tea plantations, waterfalls and wildlife. Visit Eravikulam National Park, Mattupetty Dam and Top Station for sunrise views above the clouds.",
     "Rs 15,000 - 25,000 (4 days, per person)", "September to May", "/images/munnar.jpg"),
    ("Goa", "Goa, India", "Beaches",
     "Golden beaches, Portuguese heritage, seafood and a lively nightlife.",
     "Goa offers beaches for every mood: Baga and Calangute for energy, Palolem for calm. Explore old churches in Old Goa, local markets and fresh seafood by the sea.",
     "Rs 18,000 - 30,000 (4 days, per person)", "November to February", "/images/goa.jpg"),
    ("Manali", "Himachal Pradesh, India", "Mountains",
     "A Himalayan valley for snow, adventure sports and pine forests.",
     "Manali is a base for trekking, paragliding and river rafting. Visit Solang Valley, Hadimba Temple and the Rohtang Pass area (permits needed) and enjoy snow in winter.",
     "Rs 20,000 - 35,000 (5 days, per person)", "March to June and December to February", "/images/manali.jpg"),
    ("Jaipur", "Rajasthan, India", "Cities",
     "The Pink City of palaces, forts, bazaars and royal history.",
     "Jaipur is famous for Amber Fort, City Palace, Hawa Mahal and Jantar Mantar. Its bazaars sell colourful textiles, jewellery and handicrafts, and Rajasthani food is a highlight.",
     "Rs 12,000 - 22,000 (3 days, per person)", "October to March", "/images/jaipur.jpg"),
    ("Coorg", "Karnataka, India", "Nature",
     "Coffee estates, waterfalls and forest trails in the Western Ghats.",
     "Coorg (Kodagu) is the coffee capital of India. Walk through plantations, see Abbey Falls, visit Dubare Elephant Camp and try traditional Kodava cuisine.",
     "Rs 12,000 - 20,000 (3 days, per person)", "October to March", "/images/coorg.jpg"),
    ("Kodaikanal", "Tamil Nadu, India", "Mountains",
     "A calm hill station with a star-shaped lake and pine forests.",
     "Kodaikanal is known for Kodai Lake, Coaker's Walk, Pillar Rocks and the Pine Forest. It is quieter than many hill stations and ideal for relaxed walks and views.",
     "Rs 10,000 - 18,000 (3 days, per person)", "April to June and September to October", "/images/kodaikanal.jpg"),
    ("Varkala", "Kerala, India", "Beaches",
     "Cliffside beach with sea views, cafes and a peaceful atmosphere.",
     "Varkala has a unique red cliff next to the Arabian Sea. Enjoy sunsets, yoga, cafes along the cliff and the nearby Janardhana Swamy Temple.",
     "Rs 12,000 - 20,000 (3 days, per person)", "November to March", "/images/varkala.jpg"),
    ("Pondicherry", "Puducherry, India", "Beaches",
     "French-style streets, seaside promenade and calm beaches.",
     "Pondicherry blends Tamil and French culture. Walk through the French Quarter, visit Auroville and Paradise Beach and enjoy the cafes and bakeries.",
     "Rs 10,000 - 18,000 (3 days, per person)", "October to March", "/images/pondicherry.jpg"),
    ("Mumbai", "Maharashtra, India", "Cities",
     "India's busy coastal metropolis: Gateway of India, Marine Drive, street food.",
     "Mumbai mixes colonial buildings, Bollywood, beaches and street food. See the Gateway of India, Marine Drive, Elephanta Caves and enjoy vada pav and local markets.",
     "Rs 15,000 - 28,000 (3 days, per person)", "November to February", "/images/mumbai.jpg"),
    ("Varanasi", "Uttar Pradesh, India", "Cities",
     "One of the world's oldest living cities on the banks of the Ganga.",
     "Varanasi is a spiritual centre known for its ghats, evening Ganga Aarti and narrow lanes. A sunrise boat ride on the river is a memorable experience.",
     "Rs 8,000 - 15,000 (3 days, per person)", "October to March", "/images/varanasi.jpg"),
    ("Alleppey", "Kerala, India", "Nature",
     "Houseboats gliding through peaceful palm-lined backwaters.",
     "Alleppey (Alappuzha) is the gateway to the Kerala backwaters. Stay on a traditional houseboat, watch village life on the canals and taste fresh Kerala seafood.",
     "Rs 14,000 - 25,000 (3 days, per person)", "November to February", "/images/alleppey.jpg"),
]


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # lets us read columns by name
    return conn


def init_db():
    """Create the table if missing and insert sample data. Safe to run many times:
    'name' is UNIQUE and INSERT OR IGNORE skips rows that already exist."""
    conn = get_connection()
    try:
        conn.execute(
            """CREATE TABLE IF NOT EXISTS destinations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                location TEXT NOT NULL,
                category TEXT NOT NULL,
                short_description TEXT NOT NULL,
                description TEXT NOT NULL,
                budget TEXT NOT NULL,
                best_time TEXT NOT NULL,
                image_url TEXT NOT NULL
            )"""
        )
        conn.executemany(
            """INSERT OR IGNORE INTO destinations
               (name, location, category, short_description, description, budget, best_time, image_url)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            SAMPLE_DESTINATIONS,
        )
        conn.commit()
    finally:
        conn.close()
