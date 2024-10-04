import { CancelTokenSource } from 'axios';
import { HTTP } from './http';
import { Product, ProductData } from '../types/product';

class ProductService{
	getAll({ limit, skip }: {limit: number, skip:number}, cancelToken: CancelTokenSource){
		return HTTP.Get<Product>({
			route: `/products?limit=${limit}&skip=${skip}`,
			cancelToken,
		});
	}

	getOne(id: string, cancelToken: CancelTokenSource){
		return HTTP.Get<ProductData>({
			route: `/products/${id}`,
			cancelToken,
		});
	}

	filter({ limit, skip, searchInput }: { limit: number, skip: number, searchInput: string }, cancelToken: CancelTokenSource){
		return HTTP.Get<Product>({
			route: `products/search?q=${searchInput}&limit=${limit}&skip=${skip}`,
			cancelToken,
		});
	}

	addProduct(data: ProductData, cancelToken: CancelTokenSource){
		return HTTP.Post<ProductData>({
			route: '/products/add',
			cancelToken,
			body: data
		});
	}

	updateProduct({ formData, id }: { formData: ProductData, id: string }, cancelToken: CancelTokenSource){
		return HTTP.Put<ProductData>({
			route: `/products/${id}`,
			cancelToken,
			body: formData
		});
	}

	deleteProduct(id:number, cancelToken: CancelTokenSource){
		return HTTP.Delete<ProductData>({
			route: `/products/${id}`,
			cancelToken
		});
	}

}

export const productService = new ProductService();
