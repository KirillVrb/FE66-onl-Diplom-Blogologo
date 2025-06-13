import { JSX } from "react"

export type PostType = {
    id: number
    image_url: string
    summary: string
    published_at: string
    lesson_num?: number
    title: string
    author?: number
    isFavorite?: boolean
}

export type PostsType = {
    // children: Element
    posts: PostType[]
}

export type SwitchType = {
    leftPointer: string
    rightPointer: string
    children: JSX.Element
}