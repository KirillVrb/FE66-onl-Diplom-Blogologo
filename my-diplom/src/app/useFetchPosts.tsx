
import { useEffect, useState } from "react";
import { BLOG_PATH, ERROR_MSG, URL_API } from "./consts";

type PostType = {
  id: number;
  image_url: string;
  summary: string;
  published_at: string;
  lesson_num: number;
  title: string;
  author: number;
};

type PostsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostType[];
};

const MAX_TOTAL_ITEMS = 72; // Максимальное количество элементов
const ITEMS_PER_PAGE = 12;  // Количество элементов на странице

const useFetchPosts = () => {
  const [postsList, setPostsList] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      
      // Проверяем, не превышает ли offset максимальное количество элементов
      if (offset >= MAX_TOTAL_ITEMS) {
        setPostsList([]);
        setTotalPages(Math.ceil(MAX_TOTAL_ITEMS / ITEMS_PER_PAGE));
        return;
      }
      
      // Рассчитываем актуальный limit (может быть меньше ITEMS_PER_PAGE на последней странице)
      const actualLimit = Math.min(ITEMS_PER_PAGE, MAX_TOTAL_ITEMS - offset);
      
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=${actualLimit}&offset=${offset}`
      );
      
      if (!response.ok) throw new Error(ERROR_MSG);

      const data: PostsResponse = await response.json();
      
      // Ограничиваем общее количество элементов
      const adjustedCount = Math.min(data.count, MAX_TOTAL_ITEMS);
      
      setPostsList(data.results);
      setTotalPages(Math.ceil(adjustedCount / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPosts(page);
    }
  };

  return {
    postsList,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToPage,
    maxTotalItems: MAX_TOTAL_ITEMS, // Добавляем информацию о лимите
  };
};

export default useFetchPosts;