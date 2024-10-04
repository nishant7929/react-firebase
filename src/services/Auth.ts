import { CancelTokenSource } from 'axios';
import { Form, User } from '../types/auth';
import { HTTP } from './http';

class AuthService {
	login(loginData: Form, cancelToken: CancelTokenSource) {
		return HTTP.Post<User>({
			route: '/auth/login',
			cancelToken,
			body: loginData
		});
	}
}

export const authService = new AuthService();
