import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { articles, getArticlesByCategory, getArticleById } from '../data/articles'
import ArticleCard from '../components/ArticleCard'
import ArticleReader from '../components/ArticleReader'
import Footer from '../components/Footer'

const categories = ['All', 'Industry Insights', 'Technology', 'Ecommerce', 'Operations']

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const readId = searchParams.get('read')

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredArticles(articles)
    } else {
      setFilteredArticles(getArticlesByCategory(selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (readId) {
      const article = getArticleById(readId)
      if (article) setSelectedArticle(article)
    } else {
      setSelectedArticle(null)
    }
  }, [readId])

  const handleSelectArticle = (article) => {
    if (article) {
      setSelectedArticle(article)
      setSearchParams({ read: article.id })
    } else {
      setSelectedArticle(null)
      setSearchParams({})
    }
  }

  return (
    <>
      <main className="articles-page">
        <div className="articles-layout">
          <aside className="articles-sidebar">
            <div className="articles-sidebar-header">
              <h1 className="articles-page-title">Articles &amp; Insights</h1>
              <p className="articles-page-subtitle">
                Industry problems, technology solutions, and operational best practices.
              </p>
              <div className="filter-buttons articles-filters-compact">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="articles-list">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  selected={selectedArticle?.id === article.id}
                  onSelect={handleSelectArticle}
                />
              ))}
            </div>
          </aside>

          <div className="articles-panel">
            {selectedArticle ? (
              <ArticleReader
                article={selectedArticle}
                onClose={() => handleSelectArticle(null)}
              />
            ) : (
              <div className="articles-empty-state">
                <p>Select an article to read</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
