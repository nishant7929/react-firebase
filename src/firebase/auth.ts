import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Modals } from '../utils/constant';

const authErrorHandle = (errorCode: string) => {
	switch (errorCode) {
		case 'auth/invalid-email':
			return 'Invalid email';
		case 'auth/invalid-credential':
			return 'Invalid credential';
		case 'auth/user-disabled':
			return 'User Disabled';
		case 'auth/user-not-found':
			return 'User not found';
		case 'auth/wrong-password':
			return 'The password is invalid or incorrect.';
		case 'auth/email-already-in-use':
			return 'Email is already in use by another account.';
		case 'auth/weak-password':
			return 'The password is too weak. Please choose a stronger one.';
		case 'auth/too-many-requests':
			return 'To many login requests, Please try again after some time';
		default:
			return 'An unknown error occurred.';
	}
};

export const signIn = async(email: string, password: string) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		return { success: true, user: res.user, error: null };
	} catch (error: any) {
		const firebaseErrorCode = error.code || 'auth/unknown-error';
		const firebaseErrorMessage = authErrorHandle(firebaseErrorCode);

		return {
			success: false,
			user: null,
			error: {
				code: firebaseErrorCode,
				message: firebaseErrorMessage,
			},
		};
	}
};

export const logout = async() => {
	try {
		await auth.signOut();
	} catch (error) {
		return error;
	}
};

export const signUp = async(
	email: string,
	password: string,
	userData: object,
) => {
	try {
		const user = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const res = await setDoc(doc(db, Modals.User, user.user.uid), {
			...userData,
			uid: user.user.uid,
		});
		return { success: true, user: res, error: null };
	} catch (error: any) {
		const firebaseErrorCode = error.code || 'auth/unknown-error';
		const firebaseErrorMessage = authErrorHandle(firebaseErrorCode);

		return {
			success: false,
			user: null,
			error: {
				code: firebaseErrorCode,
				message: firebaseErrorMessage,
			},
		};
	}
};
