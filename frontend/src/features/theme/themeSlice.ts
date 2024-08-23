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
		gruvbox: (state) => {
			state.value = 'gruvbox';
		},
		gruvboxDark: (state) => {
			state.value = 'gruvboxDark';
		},
		rosePineMoon: (state) => {
			state.value = 'rosePineMoon';
		},
	},
});

export const { gruvbox, gruvboxDark, rosePineMoon } = themeSlice.actions;

export default themeSlice.reducer;