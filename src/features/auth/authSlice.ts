import { currentUserByIdApi } from '@/api/user.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface InitialStateProps {
  currentUser: any;
}

const initialState = { currentUser: null } as InitialStateProps;

export const getCurrentUserByIdAsync = createAsyncThunk('user/getCurrentUserById', async (id: number) => {
  const response = await currentUserByIdApi(id);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserByIdAsync.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    });
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
