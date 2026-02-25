import ReactMarkdown from 'react-markdown'

export default function ArticleReader({ article, onClose }) {
  if (!article) return null

  return (
    <div className="articles-reader">
      <div className="articles-reader-header">
        <button
          type="button"
          className="articles-reader-close"
          onClick={onClose}
          aria-label="Close article"
        >
          &times;
        </button>
      </div>
      <div className="articles-reader-content">
        <div className="articles-reader-meta">
          <span className="article-category">{article.category}</span>
          <span className="article-date">{article.date}</span>
        </div>
        <h1 className="articles-reader-title">{article.title}</h1>
        <div className="articles-reader-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
