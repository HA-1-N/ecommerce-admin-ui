import { RootState } from '@/app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InititalStateProps {
  fetchCount: number;
  spinnerLoading: boolean;
  notification: any;
}

const initialState: InititalStateProps = {
  fetchCount: 0,
  spinnerLoading: false,
  notification: null,
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

    openToast: (state, action) => {
      return {
        ...state,
        notification: action.payload,
      };
    },
  },
});

export const { showSpinner, increaseFetch, decreaseFetch, incrementByAmount, openToast } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.app.fetchCount;

export default appSlice.reducer;
