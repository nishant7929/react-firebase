import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { addProduct, deleteProduct, filterProduct, getOneProduct, updateProduct } from './thunk';

const initProduct = {
	title: '',
	description: '',
	price: '',
	discountPercentage: '',
	rating: '',
	stock: '',
	brand: '',
	category: '',
	thumbnail: null
};
const initialState: Product = { products: [], category: [],  product: initProduct, isLoading: false, error: '', total: 0 };

const ProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: { },
	extraReducers(builder) {
		builder

			// FILTER PRODUCT
			.addCase(filterProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(filterProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.products;
				// state.total = action.payload.totalPage;
				state.error = '';
			})
			.addCase(filterProduct.rejected, (state, action) => {
				state.isLoading = false;
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
				  state.error = payload.message as string;
				} else {
				  state.error = 'Unknown error';
				}
			})

			// GET ONE PRODUCT
			.addCase(getOneProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(getOneProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload) {
					state.product = action.payload;
				}
				state.error = '';
			})
			.addCase(getOneProduct.rejected, (state, action) => {
				state.isLoading = false;
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
				  state.error = payload.message as string;
				} else {
				  state.error = 'Unknown error';
				}
			})

			// ADD PRODUCT
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(addProduct.fulfilled, (state) => {
				state.isLoading = false;
				state.error = '';
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
				  state.error = payload.message as string;
				} else {
				  state.error = 'Unknown error';
				}
			})

			// UPDATE PRODUCT
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(updateProduct.fulfilled, (state) => {
				state.isLoading = false;
				// state.product = action.payload;
				state.error = '';
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false;
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
				  state.error = payload.message as string;
				} else {
				  state.error = 'Unknown error';
				}
			})

			// DELETE PRODUCT
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(deleteProduct.fulfilled, (state) => {
				state.isLoading = false;
				// state.product = action.payload;
				state.error = '';
				alert('Product deleted.');
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				const payload = action.payload as Record<string, unknown>;
				if ('message' in payload) {
				  state.error = payload.message as string;
				} else {
				  state.error = 'Unknown error';
				}
			});

	}
});



export default ProductSlice.reducer;
