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
                    <Post key={postsList[1].id} image={postsList[1].image} text={postsList[1].text} date={postsList[1].date} title={postsList[1].title} />
                )} 
            </div> 
            <Switching leftPointer={"Prev"} rightPointer={"Next"} children={<span></span>}/>
        </>
    )
}

export default PostPage