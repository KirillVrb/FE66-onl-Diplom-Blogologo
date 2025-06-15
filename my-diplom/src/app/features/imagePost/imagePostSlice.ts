
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
  },
})

export const { openSelectedImg, closeSelectedImg } = imagePostSlice.actions
export default imagePostSlice.reducer