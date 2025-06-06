import styles from "./posts-list_styles.module.scss"
import { PostsType } from "../types"
import MainPost from "../MainPost/Main-post"
import MiddlePost from "../MiddlePost/Middle-post"
import ImagePost from "../features/imagePost/ImagePost"
// import LittlePost from "../LittlePost/Little-post"
// import { JSX, Key } from "react"
// type PostType = {
//     id: number
//     image: string
//     text: string
//     date: string
//     lesson_num: number
//     title: string
//     author: number
// }

// type PostsType = {
//     posts: PostType[]
// }

const PostsList = (props: PostsType) => {
    return (
        <div className={styles.container}>
            <div className={styles.posts}>
                {/* <div className={styles.posts__main}>
                    {props.posts?.length > 0 && (
                        <MainPost key={props.posts[0].id} image={props.posts[0].image} text={props.posts[0].text} date={props.posts[0].date} title={props.posts[0].title} />
                    )}
                </div> */}
                < ImagePost />
                <div className={styles.posts__middleWrapper}>
                    <div className={styles.posts__middle}>
                        {props.posts.map(post => (
                            <MiddlePost key={post.id} image={post.image} text={post.text} date={post.date} title={post.title} id={post.id} />
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className={styles.posts__little}>
                {props.posts.map(post => (
                    <LittlePost key={post.id} image={post.image} text={post.text} date={post.date} title={post.title} />
                ))}
            </div> */}
        </div>
    )
}
export default PostsList