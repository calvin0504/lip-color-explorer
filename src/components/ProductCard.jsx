export default function ProductCard({ product, onClick }) {
  const { brand, name, colorName, hex, finish, price, imageUrl } = product;

  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}>
      <div className="card-image-wrap">
        <img className="card-image" src={imageUrl} alt={`${brand} ${name} ${colorName}`} loading="lazy" />
        <span className="finish-badge">{finish}</span>
      </div>
      <div className="card-body">
        <div className="swatch-row">
          <span className="swatch" style={{ backgroundColor: hex }} aria-hidden="true" />
          <span className="swatch-hex">{hex}</span>
        </div>
        <p className="card-brand">{brand}</p>
        <p className="card-name">{name}</p>
        <p className="card-color">{colorName}</p>
        <p className="card-price">{price.toLocaleString()}원</p>
      </div>
    </article>
  );
}
