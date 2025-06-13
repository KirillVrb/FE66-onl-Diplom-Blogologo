"use client"

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import PostCard from './PostCard/PostCard'
import styles from './search.module.scss'

type Post = {
  id: number
  title: string
  image_url: string
  summary: string
  published_at: string
}

const RESULTS_PER_PAGE = 12
const MAX_TOTAL_ITEMS = 72

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCurrentPage, setSearchCurrentPage] = useState(1)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  
  // Загружаем все посты (до MAX_TOTAL_ITEMS)
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=${MAX_TOTAL_ITEMS}`
        )
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setAllPosts(data.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAllPosts()
  }, [])

  // Фильтрация постов по запросу
  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerCaseQuery = query.toLowerCase()
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.summary.toLowerCase().includes(lowerCaseQuery)
    )
  }, [query, allPosts])

  // Пагинация для результатов поиска
  const searchTotalPages = Math.ceil(filteredResults.length / RESULTS_PER_PAGE)
  const paginatedResults = useMemo(() => {
    const startIndex = (searchCurrentPage - 1) * RESULTS_PER_PAGE
    return filteredResults.slice(startIndex, startIndex + RESULTS_PER_PAGE)
  }, [filteredResults, searchCurrentPage])

  // Сбрасываем страницу поиска при изменении запроса
  useEffect(() => {
    setSearchCurrentPage(1)
  }, [query])

  // Обработчики пагинации для результатов поиска
  const goToSearchPage = (page: number) => {
    if (page >= 1 && page <= searchTotalPages) {
      setSearchCurrentPage(page)
    }
  }

  // Генерация кнопок страниц с учетом общего количества страниц
  const renderPageButtons = () => {
    const buttons = []
    const maxVisibleButtons = 5
    
    if (searchTotalPages <= maxVisibleButtons) {
      // Показываем все кнопки, если страниц меньше или равно 5
      for (let i = 1; i <= searchTotalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => goToSearchPage(i)}
            className={`${styles.pageButton} ${
              searchCurrentPage === i ? styles.active : ''
            }`}
            disabled={loading}
          >
            {i}
          </button>
        )
      }
    } else {
      // Сложная логика отображения для большого количества страниц
      let startPage = Math.max(1, searchCurrentPage - 2)
      let endPage = Math.min(searchTotalPages, searchCurrentPage + 2)
      
      if (searchCurrentPage <= 3) {
        endPage = maxVisibleButtons
      } else if (searchCurrentPage >= searchTotalPages - 2) {
        startPage = searchTotalPages - maxVisibleButtons + 1
      }
      
      // Первая страница и многоточие
      if (startPage > 1) {
        buttons.push(
          <button
            key={1}
            onClick={() => goToSearchPage(1)}
            className={`${styles.pageButton} ${
              searchCurrentPage === 1 ? styles.active : ''
            }`}
            disabled={loading}
          >
            1
          </button>
        )
        if (startPage > 2) {
          buttons.push(<span key="left-ellipsis" className={styles.ellipsis}>...</span>)
        }
      }
      
      // Основной диапазон страниц
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => goToSearchPage(i)}
            className={`${styles.pageButton} ${
              searchCurrentPage === i ? styles.active : ''
            }`}
            disabled={loading}
          >
            {i}
          </button>
        )
      }
      
      // Многоточие и последняя страница
      if (endPage < searchTotalPages) {
        if (endPage < searchTotalPages - 1) {
          buttons.push(<span key="right-ellipsis" className={styles.ellipsis}>...</span>)
        }
        buttons.push(
          <button
            key={searchTotalPages}
            onClick={() => goToSearchPage(searchTotalPages)}
            className={`${styles.pageButton} ${
              searchCurrentPage === searchTotalPages ? styles.active : ''
            }`}
            disabled={loading}
          >
            {searchTotalPages}
          </button>
        )
      }
    }
    
    return buttons
  }

  return (
    <div className={styles.container}>
      <h1>Search Results for "{query}"</h1>
      
      {loading && allPosts.length === 0 ? (
        <div className={styles.loading}>Loading posts...</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : filteredResults.length > 0 ? (
        <>
          <div className={styles.resultsGrid}>
            {paginatedResults.map(post => (
              <PostCard 
                key={post.id}
                id={post.id}
                title={post.title}
                image_url={post.image_url}
                summary={post.summary}
                published_at={post.published_at}
              />
            ))}
          </div>
          
          {/* Пагинация для результатов поиска */}
          {searchTotalPages > 1 && (
            <div className={styles.switchContainer}>
              <button 
                className={`${styles.switchLeft} ${searchCurrentPage !== 1 ? styles.hoverable : ''}`} 
                onClick={() => goToSearchPage(searchCurrentPage - 1)} 
                disabled={searchCurrentPage === 1 || loading}
              >
                <div className={styles.switchWrapperArrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                    <path className={styles.arrowPath} fill="rgba(255, 255, 255, 0.2)" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z" />
                  </svg>
                </div>
                <div className={styles.switchPointer}>Prev</div>
              </button>
              
              <div className={styles.wrapperPages}>
                {renderPageButtons()}
              </div>

              <button 
                className={`${styles.switchRight} ${searchCurrentPage !== searchTotalPages ? styles.hoverable : ''}`} 
                onClick={() => goToSearchPage(searchCurrentPage + 1)} 
                disabled={searchCurrentPage === searchTotalPages || loading}
              >
                <div className={styles.switchPointer}>Next</div>
                <div className={styles.switchWrapperArrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                    <path className={styles.arrowPath} fill="#fff" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          {query ? 'No posts found matching your search' : 'Enter a search term to find posts'}
        </div>
      )}
    </div>
  )
}