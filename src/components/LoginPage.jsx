import { useState } from "react";
import emailjs from "@emailjs/browser";
import { INITIAL_USERS } from "../data.js";
import logoWhite from "/logo-white.png";

const EJS_SERVICE  = "service_1yzqhuj";
const EJS_TEMPLATE = "template_0nrni8o";
const EJS_KEY      = "VkovpjqHQoa6hcwlv";

const EMPTY_REG = {
  razonSocial: "", nit: "", establecimiento: "", ciudad: "",
  nombreApellido: "", telefono: "", email: "", esAfiliado: "",
};

export default function LoginPage({ onLogin, users, onRequest }) {
  const [view, setView] = useState("login"); // "login" | "register" | "success"

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const [reg,     setReg]     = useState(EMPTY_REG);
  const [regErr,  setRegErr]  = useState({});
  const [sending, setSending] = useState(false);

  function handleLogin() {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = (users || INITIAL_USERS).find(
        (u) => u.username === username.trim() && u.password === password
      );
      if (user) { onLogin(user); } else {
        setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
      }
      setLoading(false);
    }, 600);
  }

  function validateReg() {
    const errs = {};
    if (!reg.razonSocial.trim())     errs.razonSocial     = "Campo requerido";
    if (!reg.nit.trim())             errs.nit             = "Campo requerido";
    if (!reg.establecimiento.trim()) errs.establecimiento = "Campo requerido";
    if (!reg.ciudad.trim())          errs.ciudad          = "Campo requerido";
    if (!reg.nombreApellido.trim())  errs.nombreApellido  = "Campo requerido";
    if (!reg.telefono.trim())        errs.telefono        = "Campo requerido";
    if (!reg.email.trim())           errs.email           = "Campo requerido";
    else if (!/\S+@\S+\.\S+/.test(reg.email)) errs.email = "Email inválido";
    if (!reg.esAfiliado)             errs.esAfiliado      = "Campo requerido";
    return errs;
  }

  function handleRegister() {
    const errs = validateReg();
    if (Object.keys(errs).length) { setRegErr(errs); return; }
    setSending(true);
    console.log("[EmailJS] Enviando solicitud...");
    emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
      razonSocial:     reg.razonSocial,
      nit:             reg.nit,
      establecimiento: reg.establecimiento,
      ciudad:          reg.ciudad,
      nombreApellido:  reg.nombreApellido,
      telefono:        reg.telefono,
      email:           reg.email,
      esAfiliado:      reg.esAfiliado,
      name:            reg.nombreApellido,
    }, { publicKey: EJS_KEY })
      .then(() => console.log("[EmailJS] OK — correo enviado"))
      .catch((err) => console.error("[EmailJS] Error:", err))
      .finally(() => {
        onRequest(reg);
        setSending(false);
        setView("success");
      });
  }

  function goToLogin() {
    setView("login");
    setReg(EMPTY_REG);
    setRegErr({});
  }

  const setField = (field) => (e) => {
    setReg((prev) => ({ ...prev, [field]: e.target.value }));
    if (regErr[field]) setRegErr((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="login-wrap">
      <div className="login-bg-pattern" />

      {/* ── LOGIN ── */}
      {view === "login" && (
        <div className="login-card">
          <div className="login-logo-area">
            <div className="login-logo-circle">
              <img src={logoWhite} alt="ASOBARES" />
            </div>
            <div className="login-divider" />
            <div className="login-heading">Biblioteca Virtual</div>
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              className={`form-input ${error ? "error-input" : ""}`}
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              className={`form-input ${error ? "error-input" : ""}`}
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Verificando..." : "Ingresar"}
          </button>

          <div className="login-access-block">
            <p className="login-access-text">¿No tienes acceso aún? Solicítalo</p>
            <button className="login-access-btn" onClick={() => setView("register")}>
              Solicitar Acceso
            </button>
          </div>
        </div>
      )}

      {/* ── REGISTRO ── */}
      {view === "register" && (
        <div className="login-card login-card--wide">
          <div className="login-logo-area">
            <div className="login-logo-circle">
              <img src={logoWhite} alt="ASOBARES" />
            </div>
            <div className="login-divider" />
            <div className="login-heading">Solicitar Acceso</div>
          </div>

          <RegField label="Nombre o razón social"      value={reg.razonSocial}     onChange={setField("razonSocial")}     error={regErr.razonSocial}     placeholder="Ej. Inversiones XYZ S.A.S." />
          <RegField label="NIT"                         value={reg.nit}             onChange={setField("nit")}             error={regErr.nit}             placeholder="Ej. 900123456-7" />
          <RegField label="Nombre del establecimiento"  value={reg.establecimiento} onChange={setField("establecimiento")} error={regErr.establecimiento} placeholder="Ej. Bar La Esquina" />
          <RegField label="Ciudad"                      value={reg.ciudad}          onChange={setField("ciudad")}          error={regErr.ciudad}          placeholder="Ej. Bogotá" />
          <RegField label="Nombre y apellido"           value={reg.nombreApellido}  onChange={setField("nombreApellido")}  error={regErr.nombreApellido}  placeholder="Ej. Juan García" />
          <RegField label="Teléfono"                    value={reg.telefono}        onChange={setField("telefono")}        error={regErr.telefono}        placeholder="Ej. 300 123 4567" type="tel" />
          <RegField label="Email"                       value={reg.email}           onChange={setField("email")}           error={regErr.email}           placeholder="Ej. juan@email.com" type="email" />

          <div className="form-group">
            <label className="form-label">¿Es afiliado a Asobares?</label>
            <div className="radio-group">
              {["Sí", "No"].map((opt) => (
                <label key={opt} className={`radio-option ${reg.esAfiliado === opt ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="esAfiliado"
                    value={opt}
                    checked={reg.esAfiliado === opt}
                    onChange={setField("esAfiliado")}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {regErr.esAfiliado && <span className="field-error">{regErr.esAfiliado}</span>}
          </div>

          <button className="login-btn" onClick={handleRegister} disabled={sending} style={{ marginTop: "4px" }}>
            {sending ? "Enviando..." : "Enviar Solicitud"}
          </button>

          <div className="login-register-link">
            <button className="link-btn" onClick={goToLogin}>← Volver al inicio de sesión</button>
          </div>
        </div>
      )}

      {/* ── ÉXITO ── */}
      {view === "success" && (
        <div className="login-card">
          <div className="login-logo-area">
            <div className="login-logo-circle">
              <img src={logoWhite} alt="ASOBARES" />
            </div>
            <div className="login-divider" />
          </div>

          <div className="register-success">
            <div className="register-success-icon">✓</div>
            <h3 className="register-success-title">¡Solicitud enviada!</h3>
            <p className="register-success-desc">
              Tu solicitud de acceso ha sido recibida. Un administrador revisará tu información
              y te enviará las credenciales de acceso a tu correo electrónico.
            </p>
          </div>

          <button className="login-btn" onClick={goToLogin}>
            Volver al inicio de sesión
          </button>
        </div>
      )}
    </div>
  );
}

function RegField({ label, value, onChange, error, placeholder, type = "text" }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        className={`form-input ${error ? "error-input" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
