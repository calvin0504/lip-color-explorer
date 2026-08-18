import { useMemo, useState } from "react";
import { PRODUCTS, FINISHES } from "./data/products";
import ProductCard from "./components/ProductCard";
import DetailSheet from "./components/DetailSheet";
import "./App.css";

export default function App() {
  const [finish, setFinish] = useState("전체");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchFinish = finish === "전체" || p.finish === finish;
      const matchQuery =
        q === "" ||
        p.brand.toLowerCase().includes(q) ||
        p.colorName.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q);
      return matchFinish && matchQuery;
    });
  }, [finish, query]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">
          Lip<span className="logo-dot">.</span>Pick
        </h1>
        <p className="tagline">오늘의 나에게 어울리는 립 컬러 찾기</p>
      </header>

      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          className="search-input"
          type="search"
          placeholder="브랜드, 컬러명으로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="브랜드, 컬러명 검색"
        />
      </div>

      <nav className="filter-bar" aria-label="제형 필터">
        {FINISHES.map((f) => (
          <button
            key={f}
            className={`chip ${finish === f ? "chip-active" : ""}`}
            onClick={() => setFinish(f)}
            aria-pressed={finish === f}
          >
            {f}
          </button>
        ))}
      </nav>

      <p className="result-count">
        {filtered.length}개의 컬러
      </p>

      {filtered.length > 0 ? (
        <main className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
          ))}
        </main>
      ) : (
        <div className="empty">
          <p className="empty-emoji">💄</p>
          <p>조건에 맞는 컬러가 없어요</p>
          <button
            className="empty-reset"
            onClick={() => {
              setFinish("전체");
              setQuery("");
            }}
          >
            전체 보기
          </button>
        </div>
      )}

      {selected && <DetailSheet product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
