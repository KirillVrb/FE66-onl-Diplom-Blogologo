import style from "./footerStyles.module.scss"

const Footer = () => {
    return (
        <div className={style.footerContainer}>
            <div className={style.footerWrapper}>
                <p className={style.footerText}>© 2025 Blogologo</p>
            </div>
            <p className={style.footerText}>All rights reserved</p>
        </div>
    )
}

export default Footer