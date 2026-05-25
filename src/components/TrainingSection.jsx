import { useState } from "react";
import { Play, X } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Visita sorpresa del Ministerio de Trabajo: ¿Está preparado?",
    cover: "/Portadas/visita-sorpresa.jpeg",
    driveId: "1nRlamM5yEB-N6WiB-6ZeQ2pmRcuTBUyl",
  },
  {
    id: 2,
    title: "De mesas vacías a reservas llenas",
    cover: "/Portadas/mesas-vacias.jpeg",
    driveId: "1IPl4cBXRmHAMuMkVeUTPxaP8ZL0-SGPH",
  },
  {
    id: 3,
    title: "El salario mínimo cambió",
    cover: "/Portadas/salario-minimo.jpeg",
    driveId: "1IdnWKNaY4PENkohogCVywecwzjDCJcVY",
  },
  {
    id: 4,
    title: "Menú estratégico para Gastroentretenimiento",
    cover: "/Portadas/menu-estrategico.jpeg",
    driveId: "1txx92A-1IeyLtvgaAlk0i1DtCd-nsFtO",
  },
  {
    id: 5,
    title: "Reglas claras, Negocios Sólidos",
    cover: "/Portadas/reglas-claras.jpeg",
    driveId: "1UKXex2SUXUkkT6J70KjPCzxJeCqP3M0N",
  },
];

export default function TrainingSection() {
  const [active, setActive] = useState(null);

  return (
    <div className="training-wrap">
      <div className="allies-hero">
        <div className="allies-hero-label">Formación Gremial</div>
        <h2 className="allies-hero-title">Capacitaciones</h2>
        <p className="allies-hero-desc">
          Videos exclusivos para los afiliados de ASOBARES Colombia.
        </p>
      </div>

      <div className="training-grid">
        {VIDEOS.map((v) => (
          <button key={v.id} className="training-card" onClick={() => setActive(v)}>
            <div className="training-thumb">
              <img src={v.cover} alt={v.title} className="training-cover" />
              <div className="training-play-overlay">
                <div className="training-play-btn">
                  <Play size={28} fill="white" color="white" />
                </div>
              </div>
            </div>
            <div className="training-info">
              <div className="training-title">{v.title}</div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <div className="training-modal">
            <div className="training-modal-header">
              <span className="training-modal-title">{active.title}</span>
              <button className="modal-close" onClick={() => setActive(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="training-modal-body">
              <iframe
                src={`https://drive.google.com/file/d/${active.driveId}/preview`}
                allow="autoplay"
                allowFullScreen
                className="training-iframe"
                title={active.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
