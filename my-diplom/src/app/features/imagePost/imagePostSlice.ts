// import { PostType } from '@/app/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedImg: null
}

export const imagePostSlice = createSlice({
  name: 'imagePost',
  initialState,
  reducers: {
    openSelectedImg: (state, action) => {
      state.selectedImg = action.payload
    }, 
    closeSelectedImg: (state) => {
        state.selectedImg = null
        },
    // toggleFavorites: (state, action) => {
    //   const post = state.posts.find((post) => post.id === action.payload);
    //   if(post) {
    //     post.isFavorite = !post.isFavorite
    //   }
    // }
  },
})

export const { openSelectedImg, closeSelectedImg } = imagePostSlice.actions
export default imagePostSlice.reducer