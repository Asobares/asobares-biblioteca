import { CATEGORY_COLORS } from "../data.js";

function getThumbnail(driveUrl) {
  const match = driveUrl && driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
  }
  return null;
}

export default function PdfCard({ pdf, onOpen, style }) {
  const color     = CATEGORY_COLORS[pdf.category] || "#8B0000";
  const thumbnail = getThumbnail(pdf.driveUrl);

  return (
    <div
      className="pdf-card pdf-card-clickable"
      style={style}
      onClick={() => onOpen(pdf)}
    >
      <div className="pdf-card-top" style={{ background: `${color}18`, position: "relative", overflow: "hidden" }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={pdf.title}
            className="pdf-thumbnail"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="pdf-icon-fallback"
          style={{ display: thumbnail ? "none" : "flex", color }}
        >
          <span style={{ fontSize: "2.5rem" }}>{pdf.icon || "📄"}</span>
        </div>
      </div>
      <div className="pdf-card-body">
        <div className="pdf-title">{pdf.title}</div>
        {pdf.description && <div className="pdf-desc">{pdf.description}</div>}
        <div className="pdf-open-hint" style={{ color }}>
          Ver documento →
        </div>
      </div>
    </div>
  );
}
