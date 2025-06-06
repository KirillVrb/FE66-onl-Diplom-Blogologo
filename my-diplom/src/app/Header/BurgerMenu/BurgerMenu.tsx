import Link from "next/link"
import style from "./burgerMenu.module.scss"
import SvgLight from "../SVG/SvgLight"
import SvgDark from "../SVG/SvgDark"

const BurgerMenu = () => {
    return (
        <div className={style.burgerContainer}>
            <div className={style.burgerWrapperUp}>
                <div className={style.burgerProfile}>
                    <div className={style.burgerInitials}>KV</div>
                    <p className={style.burgerName}>Kirill Vrublevski</p>
                </div>
                <Link href="/" className={style.burgerHome}>Home</Link>
                <button className={style.burgerAddPost}>Add Post</button>
            </div>
            <div className={style.burgerWrapperDown}>
                <div className={style.burgerTheme}>
                    <button className={style.burgerLight}><SvgLight/></button>
                    <button className={style.burgerDark}><SvgDark/></button>
                </div>
                <button className={style.burgerLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default BurgerMenu