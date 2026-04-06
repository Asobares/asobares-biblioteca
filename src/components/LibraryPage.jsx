import { useState } from "react";
import PdfCard        from "./PdfCard.jsx";
import PdfModal       from "./PdfModal.jsx";
import UserManagement from "./UserManagement.jsx";
import AddDocument    from "./AddDocument.jsx";
import logo from "/logo.png";

export default function LibraryPage({ user, users, onUsersChange, pdfs, onPdfsChange, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search,         setSearch]         = useState("");
  const [openPdf,        setOpenPdf]        = useState(null);
  const [showUsers,      setShowUsers]      = useState(false);
  const [showAddDoc,     setShowAddDoc]     = useState(false);

  const canManageUsers = user.role === "superadmin" || user.role === "admin";
  const isSuperAdmin   = user.role === "superadmin";

  const categories = ["Todos", ...new Set(pdfs.map((p) => p.category).filter(Boolean))];

  const filtered = pdfs.filter((p) => {
    const matchCat    = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <div className="header-logo"><img src={logo} alt="ASOBARES" /></div>
        </div>
        <div className="header-right">
          {isSuperAdmin && (
            <button className="manage-btn" onClick={() => setShowAddDoc(true)}>+ Documento</button>
          )}
          {canManageUsers && (
            <button className="manage-btn" onClick={() => setShowUsers(true)}>👥 Usuarios</button>
          )}
          <div className="header-user">
            <div className="header-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="header-user-info">
              <span className="header-user-name">{user.name}</span>
              <span className="header-user-role" style={{ background: getRoleColor(user.role) }}>
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>Salir</button>
        </div>
      </header>

      <div className="hero">
        <div className="hero-label">Biblioteca Virtual</div>
        <div className="hero-title">Centro de Documentación<br />Gremial</div>
        <div className="hero-desc">
          Accede a toda la documentación oficial, normativa y recursos
          del gremio de bares y establecimientos de Colombia.
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{pdfs.length}</div>
            <div className="hero-stat-label">Documentos</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{categories.length - 1 || "—"}</div>
            <div className="hero-stat-label">Categorías</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2026</div>
            <div className="hero-stat-label">Actualizado</div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="toolbar">
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Buscar documento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📭</div>
            <div className="empty-text">No se encontraron documentos</div>
          </div>
        ) : (
          <div className="pdf-grid">
            {filtered.map((pdf, i) => (
              <PdfCard
                key={pdf.id}
                pdf={pdf}
                onOpen={setOpenPdf}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        © 2026 <span>ASOBARES Colombia</span> — Todos los derechos reservados
      </footer>

      {openPdf   && <PdfModal pdf={openPdf} onClose={() => setOpenPdf(null)} />}
      {showUsers && <UserManagement currentUser={user} users={users} onUsersChange={onUsersChange} onClose={() => setShowUsers(false)} />}
      {showAddDoc && <AddDocument pdfs={pdfs} onPdfsChange={onPdfsChange} onClose={() => setShowAddDoc(false)} />}
    </div>
  );
}

function getRoleLabel(role) {
  return { superadmin: "Super Admin", admin: "Admin", user: "Usuario" }[role] || role;
}
function getRoleColor(role) {
  return { superadmin: "#8B0000", admin: "#1565C0", user: "#2E7D32" }[role] || "#555";
}
