import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import style from "./titleStyle.module.scss"

type TitleType = {
    title: string
}

const Title = (props: TitleType) => { 
    return (
        <h1 className={style.title}>{props.title}</h1>
    )
}

export default Title