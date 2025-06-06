import { useEffect, useState } from "react";
import { BLOG_PATH, ERROR_MSG, URL_API } from "./consts";

type PostType = {
    id: number
    image: string
    text: string
    date: string
    lesson_num: number
    title: string
    author: number
  }

  type PostsType = {
    posts: PostType[]
  }

const useFetchPosts = () => {
    const [postsList, setPostsList] = useState<PostType[]>([]);
    
    useEffect(() => {
        ;(async () => {
                try {
               const response = await fetch(URL_API + BLOG_PATH + '?limit=20&offset=10');
               if (!response.ok) throw new Error(ERROR_MSG);

               const data = await response.json();
               setPostsList(data.results)
           }
           catch (error) {
               console.error('Ошибка:', error)
           }
        })()
     }, [])

     return {postsList}
}

     export default useFetchPosts