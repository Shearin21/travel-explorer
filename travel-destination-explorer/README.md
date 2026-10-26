# Travel Destination Explorer

React (Vite) frontend + FastAPI backend + SQLite database.

## 1. Architecture
```
Browser (React, port 5173)  --Fetch API (JSON)-->  FastAPI (port 8000)  --SQL-->  SQLite (destinations.db)
        |
   localStorage (favourites)
```
| File | What it does |
|---|---|
| backend/main.py | FastAPI app, CORS, the 4 API endpoints, error handling |
| backend/database.py | Creates the SQLite table, inserts 12 sample destinations once (no duplicates) |
| backend/models.py | Pydantic model = shape of the JSON response |
| backend/requirements.txt | Python packages |
| frontend/src/main.jsx | Starts React |
| frontend/src/App.jsx | Main brain: loads data, search/filter state, favourites, page switching |
| frontend/src/services/api.js | All fetch() calls to the backend |
| frontend/src/services/helpers.js | localStorage helpers + category emojis |
| frontend/src/components/ | Navbar, Hero, DestinationCard, DestinationGrid, SearchFilter, DetailsModal, StatusMessages (loading/error/empty) |
| frontend/src/pages/ | Home, Explore, Favourites |
| frontend/src/index.css | All styling, responsive |
| frontend/public/images/ | Put your destination photos here (see README.txt in that folder) |

## 2. Prerequisites
Install these once and check versions:
```
python --version     (3.9 or newer)
node --version       (18 or newer)
npm --version
```
Download: python.org and nodejs.org (LTS). On Windows tick "Add Python to PATH".

## 3. Run the backend (Terminal 1)
```
cd travel-destination-explorer/backend
python -m venv venv
venv\Scripts\activate            (Windows)     source venv/bin/activate   (Mac/Linux)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Leave it running. `destinations.db` is created automatically on first start.

## 4. Run the frontend (Terminal 2)
```
cd travel-destination-explorer/frontend
npm install
npm run dev
```

## 5. URLs
- App: http://localhost:5173
- API docs (auto-generated, great for demo): http://localhost:8000/docs
- Health: http://localhost:8000/api/health

## 6. Test the API
Open in the browser (or use curl):
1. http://localhost:8000/api/health  -> {"status":"ok","message":"Backend is running"}
2. http://localhost:8000/api/destinations -> list of 12 destinations
3. http://localhost:8000/api/destinations/1 -> Ooty
4. http://localhost:8000/api/destinations/999 -> {"detail":"Destination not found"} (404)
5. http://localhost:8000/api/categories -> ["Beaches","Cities","Mountains","Nature"]

## 7. Common errors and fixes
| Problem | Fix |
|---|---|
| App shows "Cannot reach the server" | Backend is not running. Start Terminal 1 and click "Try again" |
| `uvicorn` not recognised | Activate the venv first, or run `python -m uvicorn main:app --reload --port 8000` |
| `pip` / `python` not found | Reinstall Python with "Add to PATH"; try `py` or `python3` |
| CORS error in browser console | Open the app at exactly http://localhost:5173 (or add your URL to `allow_origins` in main.py) |
| Port 8000 or 5173 already in use | Close the old terminal, or use `--port 8001` and set `VITE_API_URL=http://localhost:8001` in frontend/.env |
| `npm install` fails | Check internet, check `node --version` is 18+, delete node_modules and retry |
| Cards show coloured placeholders | Photos are missing. Add jpg files to frontend/public/images (names in that folder's README.txt) |
| Changed sample data but not updated | Delete backend/destinations.db and restart the backend |

## 8. Final checklist (tick each yourself while running the app)
- [ ] Backend starts, /api/health works
- [ ] Home page: title, navbar (3 links), hero, search bar, intro text
- [ ] Featured cards show on Home
- [ ] Explore: all cards show image/placeholder, name, location, description, category, budget, best time
- [ ] Search "goa" and "kerala" work (name and location)
- [ ] Category buttons filter; "All Destinations" resets
- [ ] Search "xyz" shows the friendly empty message
- [ ] View Details opens modal with all details; Esc/click outside closes
- [ ] Heart adds/removes favourite; counter in navbar updates
- [ ] Favourites page lists saved ones; refresh page: still saved
- [ ] Stop backend, refresh: error message with Try again button
- [ ] Resize browser to phone width: layout adapts
- [ ] Restart backend twice: still 12 destinations (no duplicates)

## Implemented vs future
Implemented: everything in the checklist above. Not implemented (future): user login, adding/editing/deleting destinations from the UI (no POST/PUT/DELETE endpoints), backend search endpoint, maps, reviews, booking, favourites stored in database.
