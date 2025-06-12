"use client"

import Link from "next/link"
import style from "./headerStyle.module.scss"
import SvgLogin from "./SVG/SvgLogin"
import SvgSearch from "./SVG/SvgSearch"
import SvgLogo from "./SVG/SvgLogo"
import BurgerMenu from "./BurgerMenu/BurgerMenu"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import SvgLogout from "./SVG/SvgLogout"
import { logout } from "../features/profile/profileSlice"

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(prevState => !prevState)
    }
    const profileEmail = useAppSelector(state => state.profile.email)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <div className={style.headerContainer}>
                <Link href="/" className={style.headerBurger}>
                {/* <button className={style.headerBurger} onClick={toggleMenu}> */}
                    <SvgLogo />
                    {/* <div className={`${style.headerBurgerLineUp} ${openMenu ? style.crossUp : ''}`}></div>
                    <div className={`${style.headerBurgerLineMiddle} ${openMenu ? style.hidden : ''}`}></div>
                    <div className={`${style.headerBurgerLineDown} ${openMenu ? style.crossDown : ''}`}></div> */}
                {/* </button> */}
                </Link>
                <div className={style.headerWrapper}>
                    <button className={style.headerSearch}><SvgSearch /></button>
                    {profileEmail ? <button className={style.burgerLogout} onClick={handleLogout}>
                        <SvgLogout />
                    </button> : <Link href="/SignIn" className={style.headerLogin}>
                    <SvgLogin />
                        {/* <div className={style.burgerProfile}> */}
                            {/* <div className={style.burgerInitials}>KV</div>
                            <p className={style.burgerName}>Kirill Vrublevski</p> */}
                        {/* </div> */}
                        {/* <SvgLogin /> */}
                    </Link>}
                </div>
            </div>
            {openMenu && <BurgerMenu />}
        </>
    )
}

export default Header