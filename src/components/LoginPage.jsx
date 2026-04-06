import { useState } from "react";
import { INITIAL_USERS } from "../data.js";
import logo      from "/logo.png";       // logo color → header
import logoWhite from "/logo-white.png"; // logo blanco → login

export default function LoginPage({ onLogin, users }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = (users || INITIAL_USERS).find(
        (u) => u.username === username.trim() && u.password === password
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-wrap">
      <div className="login-bg-pattern" />
      <div className="login-card">

        <div className="login-logo-area">
          <div className="login-logo-circle">
            {/* Logo: reemplaza /public/logo.png con tu imagen real */}
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Verificando..." : "Ingresar"}
        </button>

      </div>
    </div>
  );
}
