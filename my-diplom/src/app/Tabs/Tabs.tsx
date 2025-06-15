import Link from "next/link"
import style from "./tabsStyle.module.scss"

const Tabs = () => {
    return (
        <div className={style.tabsContainer}>
            <Link href="/" className={style.tabsAll}>Articles</Link>
            <Link href="/" className={style.tabsFavorites}>News</Link>
        </div>
    )
}

export default Tabs