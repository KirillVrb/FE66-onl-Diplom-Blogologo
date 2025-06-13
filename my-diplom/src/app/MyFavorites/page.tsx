'use client'

import { useAppSelector } from "../hooks";
import Tabs from "../Tabs/Tabs";
import Title from "../Title/Title";
import { PostType } from "../types";
import style from "./myFavoritesStyle.module.scss"

const MyFavorites = () => {
    const favorites = useAppSelector(state => state.favoritesPosts.favorites);

    if (!favorites?.length) {
        return (
            <>
                <Title title={"Blog"} />
                <Tabs />
                <p className={style.favorites__container}>No favorite posts yet.</p>
            </>
        )
    }

    return (
        <>
            <Title title={"Blog"} />
            <Tabs />
            <div className={style.favorites__container}>
                <h2 className={style.favorites__title}>My Favorites</h2>
                {favorites.map((post: PostType) => (
                    <div key={post.id} className={style.favorites__block}>
                        <img src={post.image_url} className={style.favorites__blockImg}/>
                        <h3 className={style.favorites__blockTitle}>{post.title}</h3>
                    </div>
                ))}
            </div></>
    )
}

export default MyFavorites