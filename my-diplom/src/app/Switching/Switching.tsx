import { JSX } from "react"
import style from "./switchingStyles.module.scss"
import { SwitchType } from "../types"

const Switching = (props: SwitchType) => {
    return (
        <div className={style.switchContainer}>
            <button className={style.switchLeft}>
                <div className={style.switchWrapperArrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none"><path fill="rgba(255, 255, 255, 0.2)" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z" /></svg>
                </div>
                <div className={style.switchPointer}>{props.leftPointer}</div>
            </button>
            {props.children}
            <button className={style.switchRight}>
                <div className={style.switchPointer}>{props.rightPointer}</div>
                <div className={style.switchWrapperArrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none"><path fill="#fff" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z" /></svg>
                </div>
            </button>
        </div>
    )
}
export default Switching