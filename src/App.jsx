import { useState } from "react";
import { INITIAL_USERS, PDFS as INITIAL_PDFS } from "./data.js";
import LoginPage   from "./components/LoginPage.jsx";
import LibraryPage from "./components/LibraryPage.jsx";

export default function App() {
  const [user,  setUser]  = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [pdfs,  setPdfs]  = useState(INITIAL_PDFS);

  return user
    ? <LibraryPage
        user={user}
        users={users}
        onUsersChange={setUsers}
        pdfs={pdfs}
        onPdfsChange={setPdfs}
        onLogout={() => setUser(null)}
      />
    : <LoginPage
        onLogin={setUser}
        users={users}
      />;
}
