"use client"

import style from "./postPageStyles.module.scss"
import Post from "./Post/page"
import Switching from "../Switching/Switching"
import { JSX } from "react";
import useFetchPosts from "../useFetchPosts";
import {PostType, PostsType, SwitchType} from "../types"

const PostPage = () => {
    const {postsList} = useFetchPosts()
    return (
        <>
            <div className={style.postPost}>
                {postsList?.length > 0 && (
                    <Post key={postsList[0].id} image={postsList[0].image_url} text={postsList[0].summary} date={postsList[0].published_at} title={postsList[0].title} />
                )} 
            </div> 
            <Switching leftPointer={"Prev"} rightPointer={"Next"} children={<span></span>}/>
        </>
    )
}

export default PostPage