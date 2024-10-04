export interface User {
    isLoggedIn: boolean;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null | undefined;
	theme: string;
}

export interface Form {
    username: string;
    password: string;
}
