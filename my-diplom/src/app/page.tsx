"use client";

import React from "react";
import useFetchPosts from "./useFetchPosts";
import Title from "./Title/Title";
import Tabs from "./Tabs/Tabs";
import PostsList from "./PostsList/PostsList";
import Switching from "./Switching/Switching";
import style from "./Switching/switchingStyles.module.scss";
import { JSX, useEffect, useState } from "react";
import { SwitchType } from "./types"

const mainSwitching = (Component: (props: SwitchType) => JSX.Element) => {
  return () => {
    return (
      <>
      <Component leftPointer={"Prev"} rightPointer={"Next"} >
          <div className={style.wrapperPages}>
            <p className={style.page}>1</p>
            <p className={style.page}>2</p>
            <p className={style.page}>3</p>
            <p className={style.page}>...</p>
            <p className={style.page}>8</p>
          </div>
        </Component>
      </>
    )
  }
}

export default function Home() {
  
  const MainSwitchHOC = mainSwitching(Switching)
  const {postsList} = useFetchPosts()

  return (
    <>
    <Title title={"Blog"} />
      <Tabs />
      <PostsList posts={postsList} />
      < MainSwitchHOC />
      {/* < PostPage posts={postsList} children={undefined} /> */}
    </>
  );
}
