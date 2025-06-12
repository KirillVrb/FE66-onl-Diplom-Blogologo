
import styles from "./posts-list_styles.module.scss";
import { PostsType } from "../types";
import MainPost from "../MainPost/Main-post";
import MiddlePost from "../MiddlePost/Middle-post";
import ImagePost from "../features/imagePost/ImagePost";
import useFetchPosts from "../useFetchPosts";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Используем новый navigation из Next.js 13+

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const PostsList = (props: PostsType) => {
  const {
    postsList,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToPage,
  } = useFetchPosts();

  const router = useRouter();

  // Функция для обработки клика по посту
  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`); // Переход на страницу поста
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <ImagePost />
        <div className={styles.posts__middleWrapper}>
          <div className={styles.posts__middle}>
            {postsList.map((post) => (
              <div 
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className={styles.postItem} // Добавляем стиль для кликабельного элемента
              >
                <MiddlePost 
                  image_url={post.image_url} 
                  summary={post.summary} 
                  published_at={formatDate(post.published_at)} 
                  title={post.title} 
                  id={post.id} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Пагинация (остается без изменений) */}
        <div className={styles.switchContainer}>
          <button 
            className={`${styles.switchLeft} ${currentPage !== 1 ? styles.hoverable : ''}`} 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <div className={styles.switchWrapperArrow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                <path className={styles.arrowPath} fill="rgba(255, 255, 255, 0.2)" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z" />
              </svg>
            </div>
            <div className={styles.switchPointer}>Prev</div>
          </button>
          
          <div className={styles.wrapperPages}>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              // Для первых 3 страниц
              if (currentPage <= 3) {
                if (i < 3) {
                  return (
                    <button 
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`${styles.pageButton} ${
                        currentPage === i + 1 ? styles.active : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (i === 3) {
                  return <span key="ellipsis" className={styles.ellipsis}>...</span>;
                } else {
                  return (
                    <button 
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.active : ''
                      }`}
                    >
                      {totalPages}
                    </button>
                  );
                }
              }
              // Для последних 3 страниц
              else if (currentPage >= totalPages - 2) {
                if (i === 0) {
                  return (
                    <button 
                      key={1}
                      onClick={() => goToPage(1)}
                      className={`${styles.pageButton} ${
                        currentPage === 1 ? styles.active : ''
                      }`}
                    >
                      1
                    </button>
                  );
                } else if (i === 1) {
                  return <span key="ellipsis" className={styles.ellipsis}>...</span>;
                } else {
                  return (
                    <button 
                      key={totalPages - 4 + i}
                      onClick={() => goToPage(totalPages - 4 + i)}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages - 4 + i ? styles.active : ''
                      }`}
                    >
                      {totalPages - 4 + i}
                    </button>
                  );
                }
              }
              // Для средних страниц
              else {
                if (i === 0) {
                  return (
                    <button 
                      key={1}
                      onClick={() => goToPage(1)}
                      className={`${styles.pageButton} ${
                        currentPage === 1 ? styles.active : ''
                      }`}
                    >
                      1
                    </button>
                  );
                } else if (i === 1) {
                  return <span key="ellipsis-left" className={styles.ellipsis}>...</span>;
                } else if (i === 2) {
                  return (
                    <button 
                      key={currentPage}
                      onClick={() => goToPage(currentPage)}
                      className={`${styles.pageButton} ${styles.active}`}
                    >
                      {currentPage}
                    </button>
                  );
                } else if (i === 3) {
                  return <span key="ellipsis-right" className={styles.ellipsis}>...</span>;
                } else {
                  return (
                    <button 
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.active : ''
                      }`}
                    >
                      {totalPages}
                    </button>
                  );
                }
              }
            })}
          </div>

          <button 
            className={`${styles.switchRight} ${currentPage !== totalPages ? styles.hoverable : ''}`} 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <div className={styles.switchPointer}>Next</div>
            <div className={styles.switchWrapperArrow}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                <path className={styles.arrowPath} fill="#fff" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
