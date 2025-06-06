import { BLOG_PATH, URL_API } from '@/app/consts';
import { PostType } from '@/app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

  type InitialStateType = {
  favorites: PostType[],
  posts: PostType[]
}

const initialState: InitialStateType = {
  favorites: [],
  posts: []
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(URL_API + BLOG_PATH + '?limit=20&offset=10');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return (await response.json()) as {
    count: number,
    next: string,
    previous: string,
    results: PostType[]
  };
});

const favoritesPostsSlice = createSlice({
  name: 'favoritesPosts',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const postToAdd = action.payload;
      if (!state.favorites.some(post => post.id === postToAdd.id)) {
        state.favorites.push(postToAdd);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(post => post.id !== action.payload);
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.results;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesPostsSlice.actions;
export default favoritesPostsSlice.reducer;