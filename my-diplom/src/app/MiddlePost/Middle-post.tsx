import styles from "./middle-post__style.module.scss"

import { PostType } from "../types"

const MiddlePost = (props: PostType) => {
    return (
        <div className={styles.middle}>
            <div className={styles.middle__wrapperImg}>
                <img src={props.image_url} alt={props.image_url} className={styles.middle__img} />
            </div>
            <div className={styles.middle__description}>
                <p className={styles.middle__date}>{props.published_at}</p>
                <h2 className={styles.middle__title}>{props.title}</h2>
            </div>
        </div>
    )
}

export default MiddlePost