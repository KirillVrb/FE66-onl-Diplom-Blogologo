"use client"

import { PostType } from '../types';
import styles from './PostDetail.module.scss';
import { useRouter } from 'next/navigation';
import LikeDislike from "../PostPage/Buttons/LikeDislike/LikeDislike"
import AddFav from "../PostPage/Buttons/AddFav/AddFav"

const formatPostDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function PostDetail({ post }: { post: PostType }) {
  const router = useRouter();

  return (
    <div className={styles.detail}>
      <button 
        onClick={() => router.back()} 
        className={styles.backButton}
      >
        ← Home
      </button>
      
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.post__imgWrapper}>
        <img 
          src={post.image_url} 
          alt={post.title} 
          className={styles.post__img}
        />
      </div>

      <div className={styles.postDate}>
        <span>{formatPostDate(post.published_at)}</span>
      </div>
      <div className={styles.post__text}>
        <p>{post.summary}</p>
      </div>
      <div className={styles.postBtns}>
        <LikeDislike />
        <AddFav />
      </div>
    </div>
  );
}