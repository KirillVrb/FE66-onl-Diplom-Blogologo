import { configureStore } from '@reduxjs/toolkit'
import imagePostReducer from './features/imagePost/imagePostSlice'
import favoritesPostsReducer from "./features/favoritesPosts/favoritesPosts"
import profileReducer from "./features/profile/profileSlice"

export const store = configureStore({
    reducer: {
        imagePost: imagePostReducer,
        favoritesPosts: favoritesPostsReducer,
        profile: profileReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch