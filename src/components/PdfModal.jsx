export default function PdfModal({ pdf, onClose }) {
  if (!pdf) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-category">
              {pdf.icon} {pdf.category}
            </div>
            <div className="modal-title">{pdf.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <iframe
            className="modal-iframe"
            src={pdf.driveUrl}
            allow="autoplay"
            title={pdf.title}
          />
        </div>

        <div className="modal-footer">
          <a
            href={pdf.driveUrl.replace("/preview", "/view")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-secondary">↗ Abrir en Drive</button>
          </a>
          <button className="btn-secondary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
