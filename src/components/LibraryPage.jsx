import { useState } from "react";
import PdfCard        from "./PdfCard.jsx";
import PdfModal       from "./PdfModal.jsx";
import UserManagement from "./UserManagement.jsx";
import AddDocument    from "./AddDocument.jsx";
import RequestsPanel  from "./RequestsPanel.jsx";
import { CATEGORY_COLORS } from "../data.js";
import logo from "/logo.png";

const CATEGORY_ICONS = {
  "Plan de Ordenamiento Territorial":               "📋",
  "Seguridad y Convivencia":                        "🔒",
  "Ciudades 24 Horas":                             "🌃",
  "Turismo, Música y Cultura":                      "🎵",
  "Ciudades Inteligentes":                          "🏙️",
  "Consumo Responsable":                            "🍷",
  "Información General para Emprender y Formalizar":"🏪",
  "Información Laboral y Económica":               "💼",
  "Sustancias Psicoactivas":                        "🔬",
  "Estudios":                                       "📊",
};

export default function LibraryPage({ user, users, onUsersChange, pdfs, onPdfsChange, requests, onRequestsChange, onLogout }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search,         setSearch]         = useState("");
  const [openPdf,        setOpenPdf]        = useState(null);
  const [showUsers,      setShowUsers]      = useState(false);
  const [showAddDoc,     setShowAddDoc]     = useState(false);
  const [showRequests,   setShowRequests]   = useState(false);

  const pendingRequests = (requests || []).filter((r) => r.status === "pending").length;

  const canManageUsers = user.role === "superadmin" || user.role === "admin";
  const isSuperAdmin   = user.role === "superadmin";

  const categoryList = [...new Set(pdfs.map((p) => p.category).filter(Boolean))];
  const categoryCount = (cat) => pdfs.filter((p) => p.category === cat).length;

  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const searchNorm = norm(search);
  const matchesPdf = (p) =>
    norm(p.title).includes(searchNorm) ||
    norm(p.category).includes(searchNorm) ||
    (p.keywords || []).some((k) => norm(k).includes(searchNorm));

  const filtered = activeCategory
    ? pdfs.filter((p) => p.category === activeCategory && (!search || matchesPdf(p)))
    : search
    ? pdfs.filter(matchesPdf)
    : [];

  function handleBack() {
    setActiveCategory(null);
    setSearch("");
  }

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
          {isSuperAdmin && (
            <button className="manage-btn requests-btn" onClick={() => setShowRequests(true)}>
              📋 Solicitudes
              {pendingRequests > 0 && <span className="requests-badge">{pendingRequests}</span>}
            </button>
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
            <div className="hero-stat-num">{categoryList.length}</div>
            <div className="hero-stat-label">Categorías</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2026</div>
            <div className="hero-stat-label">Actualizado</div>
          </div>
        </div>
      </div>

      <div className="content">

        {/* ══ INICIO: tarjetas de categoría ══ */}
        {!activeCategory && (
          <>
            <div className="search-wrap" style={{ marginBottom: "2rem" }}>
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Buscar en toda la biblioteca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", fontSize: "1rem",
                    color: "var(--text-light)", lineHeight: 1,
                  }}
                  aria-label="Limpiar búsqueda"
                >✕</button>
              )}
            </div>

            {search ? (
              <>
                <p className="search-results-label">
                  {filtered.length === 0
                    ? "Sin resultados para"
                    : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""} para`}{" "}
                  <strong>"{search}"</strong>
                </p>
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
                        showCategory
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
            <>
            <h2 className="section-title">Explorar por Categoría</h2>
            <div className="category-grid">
              {categoryList.map((cat, i) => {
                const color = CATEGORY_COLORS[cat] || "#8B0000";
                const icon  = CATEGORY_ICONS[cat]  || "📄";
                const count = categoryCount(cat);
                return (
                  <button
                    key={cat}
                    className="cat-card"
                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    style={{ "--cat-color": color, animationDelay: `${i * 60}ms` }}
                  >
                    <div className="cat-card-top">
                      <span className="cat-card-icon">{icon}</span>
                    </div>
                    <div className="cat-card-body">
                      <div className="cat-card-name">{cat}</div>
                      <div className="cat-card-count">{count} documento{count !== 1 ? "s" : ""}</div>
                    </div>
                    <div className="cat-card-arrow">→</div>
                  </button>
                );
              })}
            </div>
            </>
            )}
          </>
        )}

        {/* ══ CATEGORÍA: listado de PDFs ══ */}
        {activeCategory && (
          <>
            <button className="back-btn" onClick={handleBack}>
              ← Volver a Categorías
            </button>

            <div className="category-header">
              <div className="category-header-badge" style={{ background: CATEGORY_COLORS[activeCategory] || "#8B0000" }}>
                {CATEGORY_ICONS[activeCategory] || "��"}
              </div>
              <div>
                <h2 className="category-header-title">{activeCategory}</h2>
                <p className="category-header-sub">{categoryCount(activeCategory)} documentos disponibles</p>
              </div>
            </div>

            <div className="search-wrap" style={{ marginBottom: "2rem" }}>
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Buscar documento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
          </>
        )}
      </div>

      <footer className="footer">
        © 2026 <span>ASOBARES Colombia</span> — Todos los derechos reservados
      </footer>

      {openPdf       && <PdfModal pdf={openPdf} onClose={() => setOpenPdf(null)} />}
      {showUsers     && <UserManagement currentUser={user} users={users} onUsersChange={onUsersChange} onClose={() => setShowUsers(false)} />}
      {showAddDoc    && <AddDocument pdfs={pdfs} onPdfsChange={onPdfsChange} onClose={() => setShowAddDoc(false)} />}
      {showRequests  && <RequestsPanel requests={requests || []} onRequestsChange={onRequestsChange} onUsersChange={onUsersChange} users={users} onClose={() => setShowRequests(false)} />}
    </div>
  );
}

function getRoleLabel(role) {
  return { superadmin: "Super Admin", admin: "Admin", user: "Usuario" }[role] || role;
}
function getRoleColor(role) {
  return { superadmin: "#8B0000", admin: "#1565C0", user: "#2E7D32" }[role] || "#555";
}
