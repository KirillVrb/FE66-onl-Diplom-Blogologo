import Link from "next/link"
import style from "./tabsStyle.module.scss"

const Tabs = () => {
    return (
        <div className={style.tabsContainer}>
            <Link href="/" className={style.tabsAll}>Articles</Link>
            <Link href="/MyFavorites" className={style.tabsFavorites}>News</Link>
            {/* <Link href="/PostPage" className={style.tabsPopular}>PostPage</Link> */}
        </div>
    )
}

export default Tabs