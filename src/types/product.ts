export interface Product {
    products: [];
	product: ProductData
	category: string[]
    isLoading: boolean;
    error: string | null;
	total: number
}

export interface ProductData {
	id?: string,
	title: string,
	description: string,
	price: string,
	discountPercentage: string,
	rating: string,
	stock: string,
	brand: string,
	category: string,
	thumbnail: File | null | string
}
