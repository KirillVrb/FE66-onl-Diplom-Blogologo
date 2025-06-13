"use client";

import React from "react";
import useFetchPosts from "./useFetchPosts";
import Title from "./Title/Title";
import Tabs from "./Tabs/Tabs";
import PostsList from "./PostsList/PostsList";

export default function Home() {
  
  const {postsList} = useFetchPosts()

  return (
    <>
      <Title title={"Blog"} />
      <Tabs />
      <PostsList posts={postsList} />
    </>
  );
}
