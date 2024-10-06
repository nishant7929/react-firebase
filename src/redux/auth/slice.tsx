import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './thunk';
import { User } from '../../types/auth';

const userId = localStorage.getItem('userId');
const Theme = localStorage.getItem('theme');
const initialState: User = {
	isLoggedIn: false,
	accessToken: '',
	isLoading: false,
	error: '',
	theme: Theme ? Theme : 'light',
	uid: userId || '',
};

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser(state) {
			state.isLoggedIn = false;
			state.accessToken = '';
			localStorage.removeItem('userId');
			state.uid = '';
		},
		toggleTheme(state) {
			localStorage.setItem(
				'theme',
				state.theme === 'dark' ? 'light' : 'dark',
			);
			state.theme = state.theme === 'dark' ? 'light' : 'dark';
		},
		handleUserLogin(state, action) {
			state.uid = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(userLogin.pending, (state) => {
				state.isLoading = true;
				state.isLoggedIn = false;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.accessToken = action.payload.accessToken;
				state.isLoggedIn = true;
				state.error = '';
			})
			.addCase(userLogin.rejected, (state, action) => {
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
					state.error = payload.message as string;
				} else {
					state.error = 'Unknown error';
				}
				state.isLoading = false;
				state.isLoggedIn = false;
			});
	},
});

export const { logoutUser, toggleTheme, handleUserLogin } = UserSlice.actions;
export default UserSlice.reducer;
