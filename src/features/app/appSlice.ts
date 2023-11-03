import { RootState } from '@/app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CounterState {
  fetchCount: number;
  spinnerLoading: boolean;
}

const initialState: CounterState = {
  fetchCount: 0,
  spinnerLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showSpinner(state, action) {
      return {
        ...state,
        spinnerLoading: action.payload,
      };
    },
    increaseFetch: (state, action) => {
      state.fetchCount += 1;
    },
    decreaseFetch: (state, action) => {
      const fetchCount = state.fetchCount - 1 < 0 ? 0 : state.fetchCount - 1;
      return {
        ...state,
        fetchCount,
      };
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.fetchCount += action.payload;
    },
  },
});

export const { showSpinner, increaseFetch, decreaseFetch, incrementByAmount } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.app.fetchCount;

export default appSlice.reducer;
