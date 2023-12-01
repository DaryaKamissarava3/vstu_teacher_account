import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://ebook.vstu.by/authorization';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization':
            "Basic VlNUVV9TVFVERU5UX0NMSUVOVDpWU1RVX1NUVURFTlRfQ0xJRU5U",
        },
      };

      const {data} = await axios.post(
        `${backendURL}/token?grant_type=password`,
        {username, password},
        config
      );
      console.log(data.roles);

      if (data.roles.includes('USER')) {
        return data;
      } else {
        return rejectWithValue("Доступ ограничен");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  roles: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.loading = false;
      state.roles = null;
      state.success = null;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload
        state.userToken = action.payload.access_token;
        state.error = null;
        state.roles = action.payload.roles;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  })
});

export const {logoutUser} = authSlice.actions;

export const authReducer = authSlice.reducer;
