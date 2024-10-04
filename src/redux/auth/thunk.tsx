import { createAsyncThunk } from '@reduxjs/toolkit';
import { Form } from '../../types/auth';
import { authService } from '../../services/Auth';
import { getCancelToken } from '../../services/http';
import { AxiosError } from 'axios';


export const userLogin = createAsyncThunk(
	'user/login',
	async(formData: Form, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await authService.login(formData, source);
			localStorage.setItem('Token', JSON.stringify(res.data.accessToken));
			return res.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return ThunkApi.rejectWithValue(error.response?.data);
		}
	}
);
