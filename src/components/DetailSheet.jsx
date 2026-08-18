import { useEffect } from "react";

export default function DetailSheet({ product, onClose }) {
  const { brand, name, colorName, hex, finish, price, imageUrl } = product;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${brand} ${name} ${colorName} 상세`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <img className="sheet-image" src={imageUrl} alt={`${brand} ${name}`} />
        <div className="sheet-body">
          <div className="sheet-top">
            <div>
              <p className="sheet-brand">{brand}</p>
              <h2 className="sheet-name">{name}</h2>
              <p className="sheet-color-name">{colorName}</p>
            </div>
            <span className="finish-badge finish-badge-lg">{finish}</span>
          </div>

          <div className="sheet-swatch-block">
            <div className="sheet-swatch" style={{ backgroundColor: hex }} />
            <div className="sheet-swatch-info">
              <p className="sheet-swatch-hex">{hex}</p>
            </div>
          </div>

          <div className="sheet-bottom">
            <p className="sheet-price">{price.toLocaleString()}원</p>
            <button className="sheet-close" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
