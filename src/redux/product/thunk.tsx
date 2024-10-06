/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ProductData } from '../../types/product';
import { getCancelToken } from '../../services/http';
import { productService } from '../../services/Product';
import { createData, deleteData, readAllData, readData, updateData } from '../../firebase/helper';
import { Modals } from '../../utils/constant';

export const getOneProduct = createAsyncThunk(
	'getOne/products',
	async(id: string, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await readData(Modals.Product, id);
			// const res = await productService.getOne(id, source);
			return res as ProductData;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const filterProduct = createAsyncThunk(
	'filter/products',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async({ limit, skip, searchInput }: { limit: number, skip: number, searchInput: string }, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await readAllData(Modals.Product);
			// const res = await productService.filter({ limit, skip, searchInput }, source);
			return { products: res };
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const addProduct = createAsyncThunk(
	'add/product',
	async(formData: ProductData, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const { image, ...filteredData } = formData;
			if (!(image instanceof File)) return;
			const res = await createData(Modals.Product, filteredData, image || undefined);
			// const res = await productService.addProduct(formData, source);
			return res;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const updateProduct = createAsyncThunk(
	'update/product',
	async({ formData, id }: { formData: ProductData, id: string }, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const { image, ...filteredData } = formData;
			if (!(image instanceof File)) return;
			const res = await updateData(Modals.Product, id, filteredData, image);
			// const res = await productService.updateProduct({ formData, id }, source);
			return res;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'delete/product',
	async(id: number, ThunkApi) => {
		try {
			const source = getCancelToken();
			ThunkApi.signal.addEventListener('abort', () => {
				source.cancel();
			});
			const res = await deleteData(Modals.Product, id.toString());
			// const res = await productService.deleteProduct(id, source);
			return res;
		} catch (error: AxiosError | unknown) {
			const err = error as AxiosError;
			return ThunkApi.rejectWithValue(err.response?.data);
		}
	}
);

