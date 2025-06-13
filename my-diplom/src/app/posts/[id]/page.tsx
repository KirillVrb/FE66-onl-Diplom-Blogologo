"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostDetail from '../../PostDetail/PostDetail';
import styles from './postPage.module.scss';

type PostType = {
  id: number;
  title: string;
  image_url: string;
  summary: string;
  published_at: string;
};

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/${params.id}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!post) return <div className={styles.notFound}>Post not found</div>;

  return (
    <div className={styles.container}>
      <PostDetail post={post} />
    </div>
  );
}
