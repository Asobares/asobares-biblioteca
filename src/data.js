// ─────────────────────────────────────────────────────────────────────────────
// USUARIOS INICIALES
// Roles disponibles: "superadmin" | "admin" | "user"
// ─────────────────────────────────────────────────────────────────────────────
export const INITIAL_USERS = [
  { id: 1, username: "superadmin", password: "super2026",   role: "superadmin", name: "Super Administrador" },
  { id: 2, username: "admin",      password: "admin2026",   role: "admin",      name: "Administrador" },
  { id: 3, username: "socio1",     password: "socio123",    role: "user",       name: "Carlos Pérez" },
  { id: 4, username: "socio2",     password: "socio456",    role: "user",       name: "María González" },
];

export const ROLE_LABELS = {
  superadmin: "Super Admin",
  admin:      "Admin",
  user:       "Usuario",
};

export const ROLE_COLORS = {
  superadmin: "#8B0000",
  admin:      "#1565C0",
  user:       "#2E7D32",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE PDFs
// Reemplaza los driveUrl con los links reales de tu Google Drive.
// Formato: https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview
// ─────────────────────────────────────────────────────────────────────────────
export const PDFS = [
  {
    id: 1,
    title: "Análisis Decreto 190 Bogotá vs Nuevo POT",
    category: "",
    description: "",
    driveUrl: "https://drive.google.com/file/d/1Ro7_7NeAwqJCEEp6zpd_wiFIgpbyyqpq/preview",
    icon: "📋",
    date: "",
    pages: "",
  },
  {
    id: 2,
    title: "Capacitación Causales de Sellamiento",
    category: "",
    description: "",
    driveUrl: "https://drive.google.com/file/d/1W64K_1285Vr6mSszihnHixN2w8ydenle/preview",
    icon: "🎓",
    date: "",
    pages: "",
  },
];

export const CATEGORIES = ["Todos"];

export const CATEGORY_COLORS = {};
