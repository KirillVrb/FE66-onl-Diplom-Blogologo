"use client"

import React, { useState } from "react";
import BigButton from "../BigButton/BigButton"
import Title from "../Title/Title"
import style from "./signInStyles.module.scss"
import Link from "next/link";
import { useAppDispatch } from "../hooks";
import { login } from "../features/profile/profileSlice";

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("login")
        dispatch(login({email: email, password: password}))
    }
    return (
        <>
            <div className={style.signInContainer}>
            <Link href="/" className={style.signInLinkBack}>Back to home</Link>
            <Title title={"Sign In"} />
                <form className={style.signInForm} onSubmit={handleLogin}>
                    <div className={style.wrapperEmail}>
                        <label className={style.emailLabel} htmlFor="signInEmail">Email</label>
                        <input className={style.emailInput} id="signInEmail" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={style.wrapperPassword}>
                        <label className={style.passwordLabel} htmlFor="signInPassword">Password</label>
                        <input className={style.passwordInput} id="signInPassword" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <a className={style.signInForgot} href="#">Forgot password?</a>
                    <BigButton value={"Sign In"} type="submit"/>
                    {/* <input type="submit" value="Submit"></input>
                    <button type="submit" >Button</button> */}
                    <p className="mt-4 text-center text-[16px]">If you don't have an account, please <Link href="/Registration" className={style.registrationLink}>Register</Link></p>

                </form>
            </div>
        </>
    )
}

export default SignIn
        