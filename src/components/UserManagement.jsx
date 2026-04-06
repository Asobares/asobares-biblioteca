import { useState } from "react";
import { ROLE_LABELS, ROLE_COLORS } from "../data.js";

// Qué roles puede crear cada rol
const CREATABLE_ROLES = {
  superadmin: ["superadmin", "admin", "user"],
  admin:      ["user"],
};

export default function UserManagement({ currentUser, users, onUsersChange, onClose }) {
  const [view, setView]         = useState("list"); // "list" | "create" | "edit"
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({ name: "", username: "", password: "", role: "user" });
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const canCreate = CREATABLE_ROLES[currentUser.role] || [];

  // Qué usuarios puede ver: superadmin ve todos, admin solo ve usuarios
  const visibleUsers = users.filter((u) => {
    if (currentUser.role === "superadmin") return true;
    if (currentUser.role === "admin") return u.role === "user";
    return false;
  });

  // Qué usuarios puede editar/eliminar
  const canManage = (target) => {
    if (target.id === currentUser.id) return false; // no se puede auto-eliminar
    if (currentUser.role === "superadmin") return true;
    if (currentUser.role === "admin") return target.role === "user";
    return false;
  };

  const resetForm = () => {
    setForm({ name: "", username: "", password: "", role: "user" });
    setError("");
    setSuccess("");
  };

  const openCreate = () => { resetForm(); setView("create"); };

  const openEdit = (u) => {
    setForm({ name: u.name, username: u.username, password: "", role: u.role });
    setEditing(u);
    setError("");
    setSuccess("");
    setView("edit");
  };

  const handleDelete = (u) => {
    if (!window.confirm(`¿Eliminar al usuario "${u.name}"?`)) return;
    onUsersChange(users.filter((x) => x.id !== u.id));
    setSuccess(`Usuario "${u.name}" eliminado.`);
  };

  const handleCreate = () => {
    setError("");
    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      return setError("Todos los campos son obligatorios.");
    }
    if (users.find((u) => u.username === form.username.trim())) {
      return setError("Ese nombre de usuario ya existe.");
    }
    const newUser = {
      id:       Date.now(),
      name:     form.name.trim(),
      username: form.username.trim(),
      password: form.password,
      role:     form.role,
    };
    onUsersChange([...users, newUser]);
    setSuccess(`Usuario "${newUser.name}" creado exitosamente.`);
    resetForm();
    setView("list");
  };

  const handleEdit = () => {
    setError("");
    if (!form.name.trim() || !form.username.trim()) {
      return setError("Nombre y usuario son obligatorios.");
    }
    const duplicate = users.find(
      (u) => u.username === form.username.trim() && u.id !== editing.id
    );
    if (duplicate) return setError("Ese nombre de usuario ya existe.");

    onUsersChange(users.map((u) =>
      u.id === editing.id
        ? { ...u, name: form.name.trim(), username: form.username.trim(),
            password: form.password || u.password, role: form.role }
        : u
    ));
    setSuccess(`Usuario "${form.name}" actualizado.`);
    setView("list");
  };

  const roleBadge = (role) => (
    <span className="um-badge" style={{ background: ROLE_COLORS[role] }}>
      {ROLE_LABELS[role]}
    </span>
  );

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal um-modal">

        {/* ── Header ── */}
        <div className="modal-header">
          <div>
            <div className="modal-category">⚙️ Gestión</div>
            <div className="modal-title">Administración de Usuarios</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* ── Body ── */}
        <div className="um-body">

          {/* Mensajes */}
          {success && <div className="um-alert um-alert-ok">✅ {success}</div>}

          {/* ── LISTA ── */}
          {view === "list" && (
            <>
              <div className="um-toolbar">
                <div className="um-count">{visibleUsers.length} usuario(s)</div>
                {canCreate.length > 0 && (
                  <button className="um-btn-primary" onClick={openCreate}>
                    + Nuevo usuario
                  </button>
                )}
              </div>

              <table className="um-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((u) => (
                    <tr key={u.id} className={u.id === currentUser.id ? "um-row-me" : ""}>
                      <td>{u.name} {u.id === currentUser.id && <span className="um-you">(tú)</span>}</td>
                      <td><code>{u.username}</code></td>
                      <td>{roleBadge(u.role)}</td>
                      <td>
                        {canManage(u) ? (
                          <div className="um-actions">
                            <button className="um-btn-edit" onClick={() => openEdit(u)}>Editar</button>
                            <button className="um-btn-del"  onClick={() => handleDelete(u)}>Eliminar</button>
                          </div>
                        ) : (
                          <span className="um-no-action">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* ── CREAR / EDITAR ── */}
          {(view === "create" || view === "edit") && (
            <div className="um-form">
              <h3 className="um-form-title">
                {view === "create" ? "Nuevo usuario" : `Editar: ${editing.name}`}
              </h3>

              {error && <div className="um-alert um-alert-err">⚠️ {error}</div>}

              <div className="um-field">
                <label>Nombre completo</label>
                <input
                  className="form-input"
                  placeholder="Ej: María González"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="um-field">
                <label>Usuario</label>
                <input
                  className="form-input"
                  placeholder="Ej: mgonzalez"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>

              <div className="um-field">
                <label>{view === "edit" ? "Nueva contraseña (dejar vacío para no cambiar)" : "Contraseña"}</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder={view === "edit" ? "••••••• (sin cambios)" : "Mínimo 6 caracteres"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div className="um-field">
                <label>Rol</label>
                <select
                  className="form-input um-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  {canCreate.map((r) => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
              </div>

              <div className="um-form-actions">
                <button className="btn-secondary" onClick={() => { setView("list"); resetForm(); }}>
                  Cancelar
                </button>
                <button
                  className="um-btn-primary"
                  onClick={view === "create" ? handleCreate : handleEdit}
                >
                  {view === "create" ? "Crear usuario" : "Guardar cambios"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
