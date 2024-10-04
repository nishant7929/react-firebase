import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/slice';
import userReducer from './auth/slice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
	reducer: {
		product: productReducer,
		user: userReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;