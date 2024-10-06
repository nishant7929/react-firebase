import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { ProductData } from '../../../types/product';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { getOneProduct, updateProduct } from '../../../redux/product/thunk';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loader from '../../../components/Loader';
import NavBar from '../../../components/NavBar';
import MyTextField from '../../../components/MyTextField';
import {
	buttonStyle,
	imagePreviewStyle,
	mainCardStyle,
	thumbnailErrorStyle,
} from './style';

const initForm = {
	title: '',
	description: '',
	price: '',
	discountPercentage: '',
	rating: '',
	stock: '',
	brand: '',
	category: '',
	image: null,
};

const Update: React.FC = () => {
	const [image, setImage] = useState<string>('');
	const [formData, setFormData] = useState<ProductData>(initForm);
	const [errorMessage, setErrorMessage] = useState({
		...initForm,
		image: '',
	});
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoading, product } = useAppSelector((state) => state.product);

	useEffect(() => {
		dispatch(getOneProduct(id));
	}, [id]);

	useEffect(() => {
		if (product) {
			setFormData(product);
		}
	}, [product]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			const thumbnail = files[0];
			setImage(URL.createObjectURL(files[0]));
			setFormData({ ...formData, image: thumbnail });
		}
	};

	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!formData.title ||
			!formData.description ||
			!formData.price ||
			!formData.discountPercentage ||
			!formData.rating ||
			!formData.stock ||
			!formData.brand ||
			!formData.category ||
			!formData.image
		) {
			setErrorMessage({
				title: 'Title is required',
				description: 'Description is required',
				price: 'Price is required',
				discountPercentage: 'Discount Percentage is required',
				rating: 'Rating is required',
				stock: 'Stock is required',
				brand: 'Brand is required',
				category: 'Category is required',
				image: 'Thumbnail is required',
			});
			return;
		} else {
			setErrorMessage({ ...initForm, image: '' });
		}

		const result = await dispatch(
			updateProduct({ formData: { ...formData, id: id }, id: id }),
		);
		if (result.meta.requestStatus === 'fulfilled') {
			navigate('/products');
		}
	};
	return (
		<div>
			<Helmet>
				<title>Update</title>
			</Helmet>

			<NavBar />

			{isLoading ? (
				<Loader />
			) : (
				<Card sx={mainCardStyle}>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={12}>
									<Typography variant="h5" gutterBottom>
										Update Product
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Title"
										name="title"
										value={formData.title}
										error={
											!formData.title &&
											errorMessage.title !== ''
										}
										helperText={
											!formData.title &&
											errorMessage.title
										}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Description"
										name="description"
										value={formData.description}
										error={
											!formData.description &&
											errorMessage.description !== ''
										}
										helperText={
											!formData.description &&
											errorMessage.description
										}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Price"
										name="price"
										type="text"
										error={
											!formData.price &&
											errorMessage.price !== ''
										}
										helperText={
											!formData.price &&
											errorMessage.price
										}
										value={formData.price}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Discount Percentage"
										name="discountPercentage"
										type="text"
										error={
											!formData.discountPercentage &&
											errorMessage.discountPercentage !==
												''
										}
										helperText={
											!formData.discountPercentage &&
											errorMessage.discountPercentage
										}
										value={formData.discountPercentage}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Rating"
										name="rating"
										type="text"
										error={
											!formData.rating &&
											errorMessage.rating !== ''
										}
										helperText={
											!formData.rating &&
											errorMessage.rating
										}
										value={formData.rating}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Stock"
										name="stock"
										type="text"
										error={
											!formData.stock &&
											errorMessage.stock !== ''
										}
										helperText={
											!formData.stock &&
											errorMessage.stock
										}
										value={formData.stock}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Brand"
										name="brand"
										type="text"
										error={
											!formData.brand &&
											errorMessage.brand !== ''
										}
										helperText={
											!formData.brand &&
											errorMessage.brand
										}
										value={formData.brand}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<MyTextField
										label="Category"
										name="category"
										type="text"
										error={
											!formData.category &&
											errorMessage.category !== ''
										}
										helperText={
											!formData.category &&
											errorMessage.category
										}
										value={formData.category}
										onChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12}>
									<input
										id="contained-button-file"
										type="file"
										style={{ display: 'none' }}
										onChange={handleImageChange}
									/>
									<label htmlFor="contained-button-file">
										<Button
											variant="contained"
											component="span"
										>
											Upload Thumbnail
										</Button>
									</label>
									{!formData.image && (
										<span style={thumbnailErrorStyle}>
											{errorMessage.image}
										</span>
									)}
									{(image || product.image) && (
										<img
											style={imagePreviewStyle}
											alt="preview image"
											src={
												image ||
												(product.image as string)
											}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<LoadingButton
										sx={buttonStyle}
										loading={isLoading}
										type="submit"
										variant="contained"
										color="primary"
									>
										Submit
									</LoadingButton>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Update;
