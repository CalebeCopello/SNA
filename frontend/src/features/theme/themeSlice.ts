import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

interface ThemeState {
	value: string;
}

const initialState: ThemeState = {
	value: 'gruvbox',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;