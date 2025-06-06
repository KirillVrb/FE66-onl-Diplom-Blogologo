import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import SignIn from "./SignIn/page";
import { getUser } from "./features/profile/profileSlice";
import { usePathname } from "next/navigation";

const PUBLIC_PAGES = [
    "/Registration",
    "/SignIn",
    "/Success"
]

const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const email = useAppSelector(state => state.profile.email)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUser())
    }, [])
    const path = usePathname()

    if (!email && PUBLIC_PAGES.indexOf(path)===-1) {
        return <SignIn />
    }
    return (
        <>
        {children}
        </>
    )
}

export default GlobalProvider