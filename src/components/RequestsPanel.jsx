import { useState } from "react";

const STATUS_LABEL = { pending: "Pendiente", approved: "Aprobada", rejected: "Rechazada" };
const STATUS_COLOR = { pending: "#F57F17", approved: "#2E7D32", rejected: "#C62828" };

function genCredentials(req) {
  const base = req.nombreApellido.trim().split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const num  = Math.floor(100 + Math.random() * 900);
  const pass = Math.random().toString(36).slice(2, 8);
  return { username: `${base}${num}`, password: pass };
}

export default function RequestsPanel({ requests, onRequestsChange, onUsersChange, users, onClose }) {
  const [filter, setFilter] = useState("pending");
  const [detail, setDetail] = useState(null);

  const visible = requests.filter((r) => filter === "all" || r.status === filter);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  function approve(req) {
    const creds = genCredentials(req);
    const newUser = {
      id:       Date.now(),
      username: creds.username,
      password: creds.password,
      role:     "user",
      name:     req.nombreApellido,
    };
    onUsersChange((prev) => [...prev, newUser]);
    updateStatus(req.id, "approved", creds);
    setDetail(null);
  }

  function reject(req) {
    updateStatus(req.id, "rejected");
    setDetail(null);
  }

  function updateStatus(id, status, creds = null) {
    onRequestsChange((prev) =>
      prev.map((r) => r.id === id ? { ...r, status, ...(creds || {}) } : r)
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal um-modal rp-modal">

        <div className="modal-header">
          <div>
            <div className="modal-category">📋 Gestión</div>
            <div className="modal-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              Solicitudes de Registro
              {pendingCount > 0 && <span className="requests-badge">{pendingCount}</span>}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="um-body">
          <div className="rp-filters">
            {["pending", "approved", "rejected", "all"].map((f) => (
              <button
                key={f}
                className={`rp-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {{ pending: "Pendientes", approved: "Aprobadas", rejected: "Rechazadas", all: "Todas" }[f]}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="empty" style={{ padding: "3rem 0" }}>
              <div className="empty-icon">📭</div>
              <div className="empty-text">
                No hay solicitudes {{ pending: "pendientes", approved: "aprobadas", rejected: "rechazadas", all: "" }[filter]}
              </div>
            </div>
          ) : (
            <div className="rp-list">
              {visible.map((req) => (
                <div key={req.id} className="rp-item" onClick={() => setDetail(req)}>
                  <div className="rp-item-left">
                    <div className="rp-avatar">{req.nombreApellido.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="rp-name">{req.nombreApellido}</div>
                      <div className="rp-sub">{req.establecimiento} · {req.email}</div>
                    </div>
                  </div>
                  <span className="rp-status" style={{ color: STATUS_COLOR[req.status], background: `${STATUS_COLOR[req.status]}18` }}>
                    {STATUS_LABEL[req.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="modal-overlay" style={{ zIndex: 300 }} onClick={(e) => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <div>
                <div className="modal-category">📋 Solicitud</div>
                <div className="modal-title">Detalle</div>
              </div>
              <button className="modal-close" onClick={() => setDetail(null)}>×</button>
            </div>

            <div className="um-body">
              <div className="rp-detail">
                <DetailRow label="Nombre / Razón social"    value={detail.razonSocial} />
                <DetailRow label="Establecimiento"          value={detail.establecimiento} />
                <DetailRow label="Nombre y apellido"        value={detail.nombreApellido} />
                <DetailRow label="Teléfono"                 value={detail.telefono} />
                <DetailRow label="Email"                    value={detail.email} />
                <DetailRow label="Fecha"                    value={new Date(detail.id).toLocaleString("es-CO")} />
                <DetailRow label="Estado"                   value={STATUS_LABEL[detail.status]} valueColor={STATUS_COLOR[detail.status]} />
                {detail.username && <>
                  <DetailRow label="Usuario asignado"    value={detail.username} />
                  <DetailRow label="Contraseña asignada" value={detail.password} />
                </>}
              </div>

              {detail.status === "pending" && (
                <div className="rp-actions">
                  <button className="rp-btn rp-btn--approve" onClick={() => approve(detail)}>✓ Aprobar</button>
                  <button className="rp-btn rp-btn--reject"  onClick={() => reject(detail)}>✕ Rechazar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value, valueColor }) {
  return (
    <div className="rp-detail-row">
      <span className="rp-detail-label">{label}</span>
      <span className="rp-detail-value" style={valueColor ? { color: valueColor, fontWeight: 700 } : {}}>{value}</span>
    </div>
  );
}
