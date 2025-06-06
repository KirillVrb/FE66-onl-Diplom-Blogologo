import style from "./postStyle.module.scss"
import Title from "@/app/Title/Title"
import LikeDislike from "../Buttons/LikeDislike/LikeDislike"
import AddFav from "../Buttons/AddFav/AddFav"

type PostType = {
    id?: number
    image: string
    text: string
    date: string
    lesson_num?: number
    title: string
    author?: number
}

const Post = (props: PostType) => {
    return (
        <>
            <p className={style.postDate}>{props.date}</p>
            <div className={style.postWrapper}>
                <Title title={props.title} />
                <div className={style.post__imgWrapper}>
                    <img src={props.image} alt={props.image} className={style.post__img} />
                </div>
                <p className={style.post__text}>{props.text}</p>
                <div className={style.postBtns}>
                    <LikeDislike />
                    <AddFav />
                </div>
            </div>

        </>
    )
}

export default Post