import { useState } from "react";
import { INITIAL_USERS, PDFS as INITIAL_PDFS } from "./data.js";
import LoginPage   from "./components/LoginPage.jsx";
import LibraryPage from "./components/LibraryPage.jsx";

function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  function set(val) {
    setState((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }
  return [state, set];
}

export default function App() {
  const [user,     setUser]     = useState(null);
  const [users,    setUsers]    = useLocalState("asobares_users",    INITIAL_USERS);
  const [pdfs,     setPdfs]     = useLocalState("asobares_pdfs",     INITIAL_PDFS);
  const [requests, setRequests] = useLocalState("asobares_requests", []);

  return user
    ? <LibraryPage
        user={user}
        users={users}
        onUsersChange={setUsers}
        pdfs={pdfs}
        onPdfsChange={setPdfs}
        requests={requests}
        onRequestsChange={setRequests}
        onLogout={() => setUser(null)}
      />
    : <LoginPage
        onLogin={setUser}
        users={users}
        onRequest={(req) => setRequests((prev) => [...prev, { ...req, id: Date.now(), status: "pending" }])}
      />;
}
