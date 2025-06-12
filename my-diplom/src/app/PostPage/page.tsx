
"use client"

import style from "./postPageStyles.module.scss"
import Post from "./Post/page"
import { useState, useEffect } from "react"

type PostType = {
  id: number;
  image_url: string;
  summary: string;
  published_at: string;
  title: string;
};

const MAX_TOTAL_POSTS = 72; // Максимальное количество постов

const useFetchOnePost = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPost = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const offset = page - 1;
      
      // Проверяем, не превышает ли offset максимальное количество постов
      if (offset >= MAX_TOTAL_POSTS) {
        setPost(null);
        setTotalPages(Math.ceil(MAX_TOTAL_POSTS / 1));
        return;
      }
      
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=1&offset=${offset}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch post');

      const data = await response.json();
      
      // Ограничиваем общее количество постов
      const adjustedCount = Math.min(data.count, MAX_TOTAL_POSTS);
      
      setPost(data.results[0] || null);
      setTotalPages(Math.ceil(adjustedCount / 1));
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(1);
  }, []);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPost(page);
    }
  };

  return {
    post,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToPage,
    maxTotalPosts: MAX_TOTAL_POSTS,
  };
};

const PostPage = () => {
  const {
    post,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToPage,
    maxTotalPosts,
  } = useFetchOnePost();

  return (
    <>
      <div className={style.postPost}>
        {post && (
          <Post 
            key={post.id} 
            image={post.image_url} 
            text={post.summary} 
            date={post.published_at} 
            title={post.title} 
          />
        )}
        {isLoading && <div className={style.loading}>Loading post...</div>}
        {error && <div className={style.error}>{error}</div>}
      </div>
      <div className={style.switchContainer}>
          <button 
            className={`${style.switchLeft} ${currentPage !== 1 ? style.hoverable : ''}`} 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <div className={style.switchWrapperArrow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                <path className={style.arrowPath} fill="rgba(255, 255, 255, 0.2)" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z" />
              </svg>
            </div>
            <div className={style.switchPointer}>Prev</div>
          </button>
        <div className={style.pageInfo}>
          Post {currentPage} of {maxTotalPosts}
        </div>
        <button 
            className={`${style.switchRight} ${currentPage !== totalPages ? style.hoverable : ''}`} 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <div className={style.switchPointer}>Next</div>
            <div className={style.switchWrapperArrow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                <path className={style.arrowPath} fill="#fff" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z" />
              </svg>
            </div>
          </button>
      </div> 
    </>
  )
}

export default PostPage