"use client"

import Link from "next/link"
import styles from "./PostCard.module.scss"

type PostCardProps = {
  id: number
  title: string
  image_url: string
  summary: string
  published_at: string
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function PostCard({
  id,
  title,
  image_url,
  summary,
  published_at
}: PostCardProps) {
  return (
    <Link href={`/posts/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={image_url} 
          alt={title}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-image.jpg'
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(published_at)}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        {/* <p className={styles.summary}>{summary}</p> */}
        {/* <div className={styles.meta}>
          <span className={styles.date}>{formatDate(published_at)}</span>
        </div> */}
      </div>
    </Link>
  )
}