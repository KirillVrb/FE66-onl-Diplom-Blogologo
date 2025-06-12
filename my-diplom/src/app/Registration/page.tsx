"use client"

import React, { useEffect, useState } from "react";
import BigButton from "../BigButton/BigButton"
import Title from "../Title/Title"
import style from "./signInStyles.module.scss"
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../hooks";
import { activate, register } from "../features/profile/profileSlice";
import { useRouter } from "next/navigation";

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [uid, setUID] = useState("")
    const [token, setToken] = useState("")

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register({ email, password, username }))
    }

    const handleRedirect = () => {
        router.push("/Success")
    }

    const handleActivate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(activate({ uid, token }))
    }

    const isActivationNeeded = useAppSelector(state => state.profile.isActivationNeeded)
    const isActivationCompleted = useAppSelector(state => state.profile.isActivationCompleted)

    useEffect(() => {
        if(isActivationCompleted){
            handleRedirect()
        }
    }, [isActivationCompleted])
    return (
        <>
            <div className={style.signInContainer}>
                <Link href="/" className={style.signInLinkBack}>Back to home</Link>
                <Title title={"Registration"} />
                {/* <form className={style.signInForm}>
                    <div className={style.wrapperEmail}>
                        <label className={style.emailLabel} htmlFor="signInEmail">Email</label>
                        <input className={style.emailInput} id="signInEmail" type="email" placeholder="Your email" />
                    </div>
                    <div className={style.wrapperPassword}>
                        <label className={style.passwordLabel} htmlFor="signInPassword">Password</label>
                        <input className={style.passwordInput} id="signInPassword" type="password" placeholder="Your password" />
                    </div>
                    <a className={style.signInForgot} href="#">Forgot password?</a>
                    <Link href="/Success"><BigButton value={"Sign In"} /></Link>
                    
                </form> */}
                {!isActivationNeeded ?
                    <form className={style.signInForm} onSubmit={handleLogin}>
                    {/* <form className={style.signInForm} onSubmit={handleRedirect}> */}
                        <div className={style.wrapperEmail}>
                            <label className={style.emailLabel} htmlFor="signInUser">User Name</label>
                            <input className={style.emailInput} id="signInUser" type="text" placeholder="Your name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={style.wrapperEmail}>
                            <label className={style.emailLabel} htmlFor="signInEmail">Email</label>
                            <input className={style.emailInput} id="signInEmail" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={style.wrapperPassword}>
                            <label className={style.passwordLabel} htmlFor="signInPassword">Password</label>
                            <input className={style.passwordInput} id="signInPassword" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <BigButton value={"Registration"} type="submit" />
                        <p className="mt-4 text-center text-[16px]">Do you have an account? <Link href="/SignIn" className={style.registrationLink}>Sign In</Link></p>
                    </form> :
                    <form className={style.signInForm} onSubmit={handleActivate}>
                        <div className={style.wrapperEmail}>
                            <label className={style.emailLabel} htmlFor="uid">UID</label>
                            <input className={style.emailInput} id="uid" type="text" placeholder="Your uid" value={uid} onChange={(e) => setUID(e.target.value)} />
                        </div>
                        <div className={style.wrapperEmail}>
                            <label className={style.emailLabel} htmlFor="token">Token</label>
                            <input className={style.emailInput} id="token" type="text" placeholder="Your token" value={token} onChange={(e) => setToken(e.target.value)} />
                        </div>
                        <BigButton value={"Activate"} type="submit" />
                    </form>}
            </div>
        </>
    )
}

export default Registration