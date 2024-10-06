export interface User {
    isLoggedIn: boolean;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null | undefined;
	theme: string;
	uid: string;
}

export interface Form {
    email: string;
    password: string;
}
