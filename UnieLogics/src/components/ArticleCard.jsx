export default function ArticleCard({ article, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`article-list-item ${selected ? 'selected' : ''}`}
      onClick={() => onSelect?.(article)}
    >
      <div className="article-list-item-meta">
        <span className="article-category">{article.category}</span>
        <span className="article-date">{article.date}</span>
      </div>
      <h3 className="article-list-item-title">{article.title}</h3>
      {article.featured && <span className="article-featured">Featured</span>}
    </button>
  )
}
