'use client'

import style from "./imagePostStyles.module.scss"
import { closeSelectedImg } from "./imagePostSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"

const ImagePost = () => {
    const dispatch = useAppDispatch()
    const selectedImage = useAppSelector(state => state.imagePost.selectedImg);

    if(!selectedImage) return null;

    const handleClose = () => {
        dispatch(closeSelectedImg())
    };

    return (
        <div className={style.image__wrapper} >
            <img className={style.image} src={selectedImage} alt="Selected" />
            <div className={style.image__close} onClick={handleClose}>
                <div className={style.image__crossUp}></div>
                <div className={style.image__crossDown}></div>
            </div>
        </div>
    )
}

export default ImagePost