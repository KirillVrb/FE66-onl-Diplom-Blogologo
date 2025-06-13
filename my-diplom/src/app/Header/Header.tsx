
"use client"

import Link from "next/link"
import style from "./headerStyle.module.scss"
import SvgLogin from "./SVG/SvgLogin"
import SvgSearch from "./SVG/SvgSearch"
import SvgLogo from "./SVG/SvgLogo"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import SvgLogout from "./SVG/SvgLogout"
import { logout } from "../features/profile/profileSlice"
import { useRouter } from "next/navigation"

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const toggleMenu = () => {
        setOpenMenu(prevState => !prevState)
    }

    const profileEmail = useAppSelector(state => state.profile.email)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery("")
        }
    }

    return (
        <>
            <div className={style.headerContainer}>
                <Link href="/" className={style.headerBurger}>
                    <SvgLogo />
                </Link>
                <div className={style.headerWrapper}>
                    <form onSubmit={handleSearch} className={style.searchForm}>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={style.searchInput}
                        />
                        <button type="submit" className={style.headerSearch}>
                            <SvgSearch />
                        </button>
                    </form>
                    
                    {profileEmail ? (
                        <button className={style.burgerLogout} onClick={handleLogout}>
                            <SvgLogout />
                        </button>
                    ) : (
                        <Link href="/SignIn" className={style.headerLogin}>
                            <SvgLogin />
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header