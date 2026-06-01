import { useState } from "react";
import { Play, X, FileText, MonitorPlay, Presentation, Sheet } from "lucide-react";

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

const FONTUR_MODULES = [
  {
    id: "cap1",
    label: "Capacitación 1",
    date: "28 de abril",
    title: "Protección de Datos y Requisitos Legales para la Operación",
    cover: "https://asobares.org/wp-content/uploads/2026/04/introduccion.jpeg",
    desc: "Sesión enfocada en el marco legal aplicable al establecimiento gastronómico: el tratamiento de datos personales bajo la normatividad colombiana, las normas de protección al consumidor y los requisitos legales básicos que debe cumplir un bar o restaurante para operar formalmente.",
    resources: [
      { type: "presentation", label: "Protección de Datos y Normas al Consumidor", href: "https://drive.google.com/file/d/19-JJaiXXIGna7FuJC3PNGaM3I5PgMQW_/view?usp=drive_link" },
      { type: "presentation", label: "Requisitos legales para la operación", href: "https://drive.google.com/file/d/1eVFqNSK-IrWCfm_R75q2slknyu2_pr9A/view?usp=drive_link" },
      { type: "recording", label: "Grabación de la capacitación", href: "https://drive.google.com/file/d/1h5CZ9itmbjwwr8H3Xd1bNnkx8zaYgw42/view" },
    ],
  },
  {
    id: "m1",
    label: "Módulo 1",
    date: "5 de mayo",
    title: "Introducción a la sostenibilidad y visión de futuro",
    cover: "https://asobares.org/wp-content/uploads/2026/04/modulo-1.jpeg",
    desc: "Sesión inaugural del programa. Presenta la NTC 6496:2020, los principios del sistema de gestión de la sostenibilidad para establecimientos gastronómicos, bares y similares, y la visión de futuro del sector hacia operaciones responsables con el ambiente, las personas y las comunidades.",
    resources: [
      { type: "presentation", label: "Módulo 1 (VF)", href: "https://docs.google.com/presentation/d/1-phd3j18XDH2Mkh24BG1Mv7BYvypgCWG/edit?slide=id.p1#slide=id.p1" },
      { type: "pdf", label: "Introducción a la sostenibilidad y visión de futuro", href: "https://drive.google.com/file/d/1BiYMSWRETV4nxt5iUNpvoMaHibb7-6zR/view?usp=drive_link" },
      { type: "pdf", label: "NTC 6496 — Guía de implementación", href: "https://drive.google.com/file/d/1S5dXmoFfIBbtKkgdcdKqW-tzakfcveEB/view?usp=drive_link" },
      { type: "pdf", label: "Sistema de gestión de la sostenibilidad — Requisitos", href: "https://drive.google.com/file/d/10wItM1tMe3gJ6FdAQFQuKUOzrx2TomuE/view?usp=drive_link" },
      { type: "recording", label: "Grabación de la capacitación", href: "https://drive.google.com/file/d/1MCnTuOTc1wuqV6O-1AcjDsQEYq3j3jaF/view" },
    ],
  },
  {
    id: "charla",
    label: "Charla de valor",
    date: "12 de mayo",
    title: "BPM, Insumos y prácticas sostenibles para el establecimiento gastronómico",
    cover: null,
    desc: "Charla complementaria al programa centrada en las Buenas Prácticas de Manufactura (BPM), la selección responsable de insumos y la incorporación de prácticas sostenibles en la operación diaria de la cocina y el servicio.",
    resources: [
      { type: "presentation", label: "BPM e insumos sostenibles", href: "https://drive.google.com/file/d/1tWNZrRVyoTVCCdy_RLestwGUh3_KdQmi/view" },
      { type: "recording", label: "Grabación de la capacitación", href: "https://drive.google.com/file/d/1WhXp4dt4MRzubilzRo18v1zi_fy-a3JC/view" },
    ],
  },
  {
    id: "m2",
    label: "Módulo 2",
    date: "19 de mayo",
    title: "Ciclo PHVA (Planear, Hacer, Verificar, Actuar)",
    cover: "https://asobares.org/wp-content/uploads/2026/04/modulo-2.jpeg",
    desc: "Introducción al ciclo PHVA como metodología de mejora continua, aplicada al sistema de gestión de la sostenibilidad. Provee la estructura lógica con la que se planifican, ejecutan, miden y ajustan las acciones de implementación de la norma.",
    resources: [
      { type: "presentation", label: "Ciclo PHVA", href: "https://docs.google.com/presentation/d/1InN0jhqzRUp0M2Ka7IuEvNbD0xpW1buB/edit?usp=drive_link" },
      { type: "recording", label: "Grabación de la capacitación", href: "https://drive.google.com/file/d/1nGVMKB_AOFRZE61X4-wJ-gURv60xn6NB/view?usp=sharing" },
    ],
  },
  {
    id: "m3",
    label: "Módulo 3",
    date: "26 de mayo",
    title: "Estudiando la plaza — análisis del contexto interno y externo",
    cover: "https://asobares.org/wp-content/uploads/2026/04/modulo-3.jpeg",
    desc: "Diagnóstico del contexto en el que opera cada establecimiento. Se trabajan los factores internos (fortalezas y debilidades) y externos (oportunidades y amenazas) que inciden en la sostenibilidad del negocio, como insumo para definir el plan de implementación.",
    resources: [
      { type: "presentation", label: "Módulo 3 — Estudiando la plaza", href: "https://docs.google.com/presentation/d/1lmUW1lByPqPMMoZ2FJ_TkmCBQZtZGsl0/edit?slide=id.g396bc67e482_0_0" },
      { type: "spreadsheet", label: "Taller — Análisis de contexto interno y externo", href: "https://docs.google.com/spreadsheets/d/1ssr5OcTc2BaorZ6qhdiyejtgSZasmFm5/edit?gid=414006855" },
    ],
  },
];

const RESOURCE_ICONS = {
  presentation: <Presentation size={15} />,
  pdf:          <FileText size={15} />,
  recording:    <MonitorPlay size={15} />,
  spreadsheet:  <Sheet size={15} />,
};

const RESOURCE_LABELS = {
  presentation: "Presentación",
  pdf:          "PDF",
  recording:    "Grabación",
  spreadsheet:  "Taller",
};

export default function TrainingSection() {
  const [active,       setActive]       = useState(null);
  const [activeFontur, setActiveFontur] = useState(null);

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

      {/* ── FONTUR ── */}
      <div className="fontur-section">
        <div className="fontur-header">
          <div className="fontur-badge">Fontur</div>
          <div>
            <div className="fontur-title">Programa de Capacitaciones</div>
            <div className="fontur-subtitle">Implementación NTC 6496:2020 — Sostenibilidad Gastronómica</div>
          </div>
        </div>

        <div className="training-grid">
          {FONTUR_MODULES.map((m) => (
            <button key={m.id} className="training-card" onClick={() => setActiveFontur(m)}>
              <div className="training-thumb">
                {m.cover ? (
                  <img src={m.cover} alt={m.title} className="training-cover" />
                ) : (
                  <div className="fontur-cover-fallback" />
                )}
                <div className="fontur-label-badge">{m.label}</div>
                <div className="fontur-date-badge">{m.date}</div>
              </div>
              <div className="training-info">
                <div className="training-title">{m.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal video ASOBARES */}
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

      {/* Modal Fontur */}
      {activeFontur && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setActiveFontur(null)}>
          <div className="fontur-modal">
            <div className="training-modal-header">
              <div>
                <div className="fontur-modal-label">{activeFontur.label} · {activeFontur.date}</div>
                <span className="training-modal-title">{activeFontur.title}</span>
              </div>
              <button className="modal-close" onClick={() => setActiveFontur(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="fontur-modal-body">
              <p className="fontur-modal-desc">{activeFontur.desc}</p>
              <div className="fontur-resources">
                {activeFontur.resources.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`fontur-resource-btn fontur-resource-btn--${r.type}`}
                  >
                    {RESOURCE_ICONS[r.type]}
                    <span>
                      <span className="fontur-resource-type">{RESOURCE_LABELS[r.type]}</span>
                      {r.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
