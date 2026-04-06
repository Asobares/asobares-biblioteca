import { CATEGORY_COLORS } from "../data.js";

export default function PdfCard({ pdf, onOpen, style }) {
  const color = CATEGORY_COLORS[pdf.category] || "#8B0000";
  const bg    = `${color}18`;

  return (
    <div className="pdf-card" style={style}>
      <div className="pdf-card-top" style={{ background: bg }}>
        <span>{pdf.icon}</span>
      </div>
      <div className="pdf-card-body">
        {pdf.category && (
          <div className="pdf-cat-badge" style={{ background: color }}>
            {pdf.category}
          </div>
        )}
        <div className="pdf-title">{pdf.title}</div>
        {pdf.description && <div className="pdf-desc">{pdf.description}</div>}
        <div className="pdf-meta">
          <span>
            {pdf.date && <>📅 {pdf.date}</>}
            {pdf.date && pdf.pages && <>&nbsp;·&nbsp;</>}
            {pdf.pages && <>📄 {pdf.pages} págs.</>}
          </span>
          <button className="pdf-open-btn" onClick={() => onOpen(pdf)}>
            Abrir PDF
          </button>
        </div>
      </div>
    </div>
  );
}
