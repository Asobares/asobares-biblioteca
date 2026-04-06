import { useState } from "react";

const ICONS = {
  "": "📄",
  Normativa: "📋",
  Legal: "⚖️",
  Financiero: "📊",
  Operativo: "✅",
  Capacitación: "🎓",
  Directorio: "👥",
  Estratégico: "🚀",
};

function getIcon(category) {
  return ICONS[category] || "📄";
}

export default function AddDocument({ pdfs, onPdfsChange, onClose }) {
  const [form, setForm]       = useState({ title: "", category: "", driveUrl: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const existingCategories = [...new Set(pdfs.map((p) => p.category).filter(Boolean))];

  const handleAdd = () => {
    setError("");
    if (!form.title.trim()) return setError("El nombre del documento es obligatorio.");
    if (!form.driveUrl.trim()) return setError("El link del documento es obligatorio.");

    let url = form.driveUrl.trim();
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return setError("El link no parece ser un enlace válido de Google Drive.");
    url = `https://drive.google.com/file/d/${match[1]}/preview`;

    const newDoc = {
      id:          Date.now(),
      title:       form.title.trim(),
      category:    form.category.trim(),
      description: "",
      driveUrl:    url,
      icon:        getIcon(form.category.trim()),
      date:        "",
      pages:       "",
    };

    onPdfsChange([...pdfs, newDoc]);
    setSuccess(`"${newDoc.title}" agregado a la biblioteca.`);
    setForm({ title: "", category: "", driveUrl: "" });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal um-modal">
        <div className="modal-header">
          <div>
            <div className="modal-category">📚 Biblioteca</div>
            <div className="modal-title">Agregar Documento</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="um-body">
          {success && <div className="um-alert um-alert-ok">✅ {success}</div>}
          {error   && <div className="um-alert um-alert-err">⚠️ {error}</div>}

          <div className="um-form" style={{ maxWidth: "100%" }}>
            <div className="um-field">
              <label>Nombre del documento</label>
              <input
                className="form-input"
                placeholder="Ej: Resolución 123 de 2026"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="um-field">
              <label>Categoría <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>(opcional)</span></label>
              <input
                className="form-input"
                placeholder="Ej: Normativa, Legal, Capacitación..."
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                list="cat-suggestions"
              />
              {existingCategories.length > 0 && (
                <datalist id="cat-suggestions">
                  {existingCategories.map((c) => <option key={c} value={c} />)}
                </datalist>
              )}
            </div>

            <div className="um-field">
              <label>Link de Google Drive</label>
              <input
                className="form-input"
                placeholder="https://drive.google.com/file/d/..."
                value={form.driveUrl}
                onChange={(e) => setForm({ ...form, driveUrl: e.target.value })}
              />
              <p className="um-hint">Pega el link tal como te lo da Google Drive. Se convierte automáticamente.</p>
            </div>

            <div className="um-form-actions">
              <button className="btn-secondary" onClick={onClose}>Cerrar</button>
              <button className="um-btn-primary" onClick={handleAdd}>+ Agregar documento</button>
            </div>

            {pdfs.length > 0 && (
              <div className="add-doc-list">
                <div className="add-doc-list-title">Documentos en la biblioteca ({pdfs.length})</div>
                {pdfs.map((p) => (
                  <div key={p.id} className="add-doc-item">
                    <span>{p.icon} {p.title}</span>
                    <button
                      className="um-btn-del"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar "${p.title}"?`))
                          onPdfsChange(pdfs.filter((x) => x.id !== p.id));
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
