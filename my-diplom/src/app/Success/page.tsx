import style from "./successStyles.module.scss"
import Header from "../Header/Header"
import Title from "../Title/Title"
import BigButton from "../BigButton/BigButton"
import Footer from "../Footer/Footer"
import Link from "next/link"

const Success = () => {
    return (
        <>
        <div className={style.successContainer}>
        <Link href="/" className={style.successLinkBack}>Back to home</Link>
                <Title title={"Success"} />
                <div className={style.successForm}>
                    <p className={style.successText}>Email confirmed</p>
                    <p className={style.successText}>Your registration is now completed</p>
                    <Link href="/"><BigButton value={"Go to home"} /></Link>
                </div>
            </div>
            </>
    )
}

export default Success