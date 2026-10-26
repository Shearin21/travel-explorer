# Presentation Guide: Travel Destination Explorer

Rule: only say what you have actually run. Fill in the testing table after YOU test.

---
## A. Project Report Content

**Abstract**
Travel Destination Explorer is a responsive full-stack web application that helps users discover tourist destinations in India. Users can search by name or location, filter by category, view detailed information and save favourite places. The frontend is built with React.js, the backend with Python FastAPI, and destination data is stored in an SQLite database and delivered through REST APIs.

**Introduction**
Planning a trip usually needs many websites. This project puts destination information in one simple, clean interface. It shows how a React frontend, a FastAPI backend and a SQLite database work together.

**Problem Statement**
Travel information is scattered across many sources, and beginners find it hard to compare places by type, budget and season. There is a need for a simple tool that gathers this in one place with quick search and filtering.

**Objectives**
1. Build a responsive web app to browse destinations.
2. Provide search by name/location and filter by category.
3. Show detailed information for each destination.
4. Let users save favourites that remain after refresh.
5. Store data in SQLite and serve it using REST APIs.

**Existing System and Proposed System**
- Existing: users search many websites or blogs; information is unorganised; no quick filtering or personal shortlist.
- Proposed: one application with organised destination data, instant search, category filter, details view and favourites.

**System Requirements**
- Hardware: any computer with 4 GB RAM or more.
- Software: Windows/Linux/macOS, Python 3.9+, Node.js 18+, VS Code, a modern web browser.

**Technologies Used**
React.js (UI), HTML/CSS/JavaScript, Vite (dev server), Python FastAPI (backend), Uvicorn (server), SQLite (database), Fetch API (REST calls), localStorage (favourites).

**System Architecture**
Three layers: Presentation (React in browser) -> Application (FastAPI REST API) -> Data (SQLite). React sends HTTP GET requests, FastAPI reads SQLite and returns JSON, React displays it. Favourites are stored in the browser's localStorage.

**Module Description**
1. Home module: hero, search bar, featured destinations.
2. Explore module: destination cards, search and category filter.
3. Details module: popup with full information (loads one record from the API).
4. Favourites module: add/remove, separate page, saved in localStorage.
5. Backend module: API endpoints, CORS, error handling.
6. Database module: table creation and one-time seeding.

**Implementation**
- Backend: `database.py` creates the `destinations` table and inserts 12 records using `INSERT OR IGNORE` with a UNIQUE name so restarts never duplicate. `main.py` exposes GET /api/health, /api/destinations, /api/destinations/{id}, /api/categories. Database errors return HTTP 500; a missing id returns 404.
- Frontend: `App.jsx` fetches data on load, keeps search/category/favourites in state, and filters the list in the browser. `api.js` wraps all fetch calls and turns failures into readable messages. Images that fail to load are replaced by a coloured placeholder.

**Testing** (fill the Result column yourself after testing)
| No | Test | Expected | Result |
|---|---|---|---|
| 1 | Open /api/health | status ok | ____ |
| 2 | Open /api/destinations | 12 records | ____ |
| 3 | Open /api/destinations/999 | 404 not found | ____ |
| 4 | Search "goa" | Goa card only | ____ |
| 5 | Search "kerala" | Munnar, Varkala, Alleppey | ____ |
| 6 | Filter Mountains | Ooty, Manali, Kodaikanal | ____ |
| 7 | Search "xyz" | friendly empty message | ____ |
| 8 | Add favourite, refresh page | still saved | ____ |
| 9 | Stop backend, refresh | error message + Try again | ____ |
| 10 | Phone-width browser | layout adapts | ____ |

**Results**
Write after testing, e.g. "All features in the test table worked as expected" only if true. Mention what you observed: speed, layout, behaviour on mobile width.

**Conclusion**
The project demonstrates a complete full-stack flow: database to API to user interface. It meets the objectives of browsing, searching, filtering, viewing details and saving favourites, and gave practical experience with React, FastAPI and SQLite.

**Future Enhancements** (NOT implemented)
User login; add/edit/delete destinations (full CRUD with POST/PUT/DELETE); backend search and pagination; favourites saved per user in the database; maps; reviews and ratings; weather; budget calculator; deployment to the cloud.

---
## B. PPT Content (8 slides)

**Slide 1: Title**
Travel Destination Explorer: A Full-Stack Web Application
Name: Jumana Shearin A | Register No: 720323104035 | 3rd Year CSE | Internship Project (add college, guide, date)

**Slide 2: Abstract and Introduction**
- Web app to explore Indian tourist destinations
- Search, filter, details, favourites
- React + FastAPI + SQLite

**Slide 3: Problem Statement and Objectives**
- Problem: travel info scattered, hard to compare
- Objectives: browse, search, filter, view details, save favourites, store data in a database with REST APIs

**Slide 4: Technologies Used**
React.js, HTML/CSS/JS, Vite | FastAPI, Uvicorn | SQLite | Fetch API (REST) | localStorage | VS Code

**Slide 5: System Architecture**
Diagram: React (browser) -> HTTP/JSON -> FastAPI -> SQL -> SQLite. Side box: localStorage for favourites.

**Slide 6: Modules and Implementation**
Home, Explore, Details, Favourites, Backend API, Database. Show 4 endpoints. Mention seeding without duplicates and error handling.

**Slide 7: Screenshots and Testing Results**
Insert YOUR screenshots: (1) Home page, (2) Explore with cards, (3) category filter result, (4) empty search message, (5) details popup, (6) Favourites page, (7) http://localhost:8000/docs page, (8) /api/destinations JSON. Add your completed testing table. Do not add anything you did not run.

**Slide 8: Conclusion and Future Enhancements**
Conclusion in 2 lines. Future: login, add/edit/delete destinations, maps, reviews, cloud deployment.

---
## C. Speech (about 3-4 minutes)

Good morning everyone. My name is Jumana Shearin A, and today I will present my internship project, Travel Destination Explorer.

When people plan a trip, they search many websites to find places, compare budgets and know the best time to visit. This is time consuming. My project solves this by giving one simple website where users can explore tourist destinations in India.

The application has three main parts. The frontend is built using React.js. This is what the user sees: the home page, destination cards, search bar and filters. The backend is built using Python FastAPI. It receives requests from the frontend and sends back data. The database is SQLite, where all destination details are stored.

Here is how they work together. When the page loads, React sends a request to the FastAPI backend using the Fetch API. FastAPI reads the data from SQLite and returns it as JSON. React then shows it as destination cards.

Users can search a place by name or location, and filter by Mountains, Beaches, Cities or Nature. If nothing matches, a friendly message is shown. Clicking View Details opens a popup with the description, budget, best time to visit and category. Users can also mark places as favourites. These are stored in the browser's localStorage, so they remain even after refreshing the page.

I also handled errors. If the backend is not running, the app shows a clear message with a Try again button. If an image fails to load, a placeholder is shown instead.

In this project I learned how frontend, backend and database connect, how REST APIs work, and how to build a responsive interface.

In the future, I want to add user login, the ability to add and edit destinations, maps and reviews.

Thank you. I am happy to answer your questions.

---
## D. Viva Questions (simple answers)

1. **What is React?** A JavaScript library for building user interfaces using reusable components.
2. **What is a component?** A small reusable piece of UI, like DestinationCard or Navbar.
3. **What are useState and useEffect?** useState stores changing data; useEffect runs code at certain times, like fetching data when the page loads.
4. **What are props?** Data passed from a parent component to a child component.
5. **What is FastAPI?** A Python framework for building APIs quickly. It gives automatic documentation at /docs.
6. **Why FastAPI?** Easy to learn, fast, automatic validation and docs.
7. **What is a REST API?** A way for programs to communicate over HTTP using URLs and methods like GET, POST, PUT, DELETE.
8. **Which endpoints did you build?** GET /api/health, /api/destinations, /api/destinations/{id}, /api/categories.
9. **What is JSON?** A text format for data, made of key-value pairs.
10. **What is Fetch API?** A browser function used to send HTTP requests to the backend.
11. **What is SQLite?** A lightweight database stored in a single file, no separate server needed.
12. **What is CRUD?** Create, Read, Update, Delete. My project implements only Read (GET). The others are future work.
13. **How did you avoid duplicate records?** The name column is UNIQUE and I insert with INSERT OR IGNORE, so restarting does not add copies.
14. **What is the difference between frontend and backend?** Frontend is what the user sees in the browser; backend handles data and logic on the server.
15. **How is the database connected to the frontend?** It is not connected directly. React calls the FastAPI API, and FastAPI queries SQLite.
16. **What is CORS and why needed?** Browsers block requests between different origins (ports 5173 and 8000). CORS middleware in FastAPI allows the React app.
17. **How does search work?** I convert the text to lowercase and check whether the destination name or location contains it. It runs in the browser on the data already fetched.
18. **How does filtering work?** I compare the destination category with the selected category; "All" shows everything.
19. **What is localStorage?** Browser storage that keeps data after refresh. I store the favourite destination IDs there.
20. **Why localStorage and not the database for favourites?** Simpler: no login needed. Limitation: favourites are per browser, not per user.
21. **What is Vite?** A fast tool to run and build React projects.
22. **How do you handle errors?** Backend returns 404/500 with messages; frontend catches errors and shows an error state with Try again.
23. **What challenges did you face?** Connecting frontend and backend (CORS), keeping data consistent, handling missing images. (Say your real ones.)
24. **What would you improve?** Login, full CRUD, backend search, pagination, maps, reviews, deployment.
25. **What is the project architecture?** Three layers: React UI, FastAPI REST API, SQLite database.

---
## E. Demo Script (about 4-5 minutes)

Before starting: backend and frontend running, browser tabs open on http://localhost:5173 and http://localhost:8000/docs, favourites cleared.

1. **Home page.** Show title, navbar, hero, search bar. Say: "This is the React frontend."
2. **Type "kerala" in hero search and press Search.** It opens Explore with Munnar, Varkala, Alleppey. Say: "Search works on name and location."
3. **Click category Mountains**, then **All Destinations**. Say: "Filtering is by category."
4. **Search "xyz".** Show the empty message, click Show all destinations.
5. **Click View Details on Ooty.** Say: "This popup requests one record from GET /api/destinations/1."
6. **Click the heart.** Badge in navbar changes. Add one more, open Favourites page.
7. **Refresh the page (F5).** Favourites remain. Say: "Stored in localStorage."
8. **Switch to localhost:8000/docs tab.** Run GET /api/destinations. Say: "Same data the cards showed, coming from SQLite through FastAPI."
9. **Optional:** stop the backend, refresh frontend, show the error message and Try again button, restart backend, click Try again.
10. **Close:** "Frontend asks, backend answers, database stores."
