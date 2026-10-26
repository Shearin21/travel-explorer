// All communication with the FastAPI backend lives here (Fetch API).
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new Error("Cannot reach the server. Is the backend running on port 8000?");
  }
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body.detail) detail = body.detail;
    } catch {
      /* ignore JSON parse errors */
    }
    throw new Error(detail);
  }
  return response.json();
}

export const getDestinations = () => request("/api/destinations");
export const getDestination = (id) => request(`/api/destinations/${id}`);
export const getCategories = () => request("/api/categories");
export const getHealth = () => request("/api/health");
