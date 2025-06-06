import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ImageModalState = {
  isOpen: boolean;
  startIndex: number;
};

const initialState: ImageModalState = {
  isOpen: false,
  startIndex: 0,
};

const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<number>) {
      state.isOpen = true;
      state.startIndex = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = imageModalSlice.actions;
export default imageModalSlice.reducer;
