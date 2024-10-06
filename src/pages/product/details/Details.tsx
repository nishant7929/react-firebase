import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Box, Container } from '@mui/material';
import NavBar from '../../../components/NavBar';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../../../redux/product/thunk';
import Loader from '../../../components/Loader';
import { containerStyle, headingStyle, paperStyle } from './style';

const ProductDetailPage: React.FC = () => {
	const { id } = useParams() as { id: string };
	const dispatch = useAppDispatch();
	const { product, isLoading } = useAppSelector(state => state.product);

	useEffect(() => {
		dispatch(getOneProduct(id));
	}, [id]);

	return (
		<>
			<Helmet>
				<title>Product Detail</title>
			</Helmet>

			<NavBar />
			{isLoading && product
				?
				<Loader />
				:
				<>
					<Typography sx={headingStyle} variant="h4" gutterBottom>
						Product {id}
					</Typography>
					<Container maxWidth="lg" sx={containerStyle}>
						<Paper elevation={3} sx={paperStyle}>
							<Grid container spacing={2}>

								{/* Product Image */}
								<Grid item xs={12} md={6}>
									{typeof product.image === 'string'
										&&
										(<img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />)}
								</Grid>

								{/* Product Details */}
								<Grid item xs={12} md={6}>
									<Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="space-between" height="100%">
										<Typography variant="h4" gutterBottom>
											{product.title}
										</Typography>
										<Typography variant="subtitle1" gutterBottom>
											Brand: {product.brand}
										</Typography>
										<Typography variant="body1" gutterBottom>
											Description: {product.description}
										</Typography>
										<Typography variant="h6" gutterBottom>
											Price: ${product.price}
										</Typography>

										<Typography variant="body1" gutterBottom>
											Discount Price: ${product.discountPercentage}
										</Typography>

										<Typography variant="subtitle2" gutterBottom>
											Rating: {product.rating} stars
										</Typography>

										<Typography variant="subtitle2" gutterBottom>
											Category: {product.category}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Paper>
					</Container>
				</>
			}
		</>
	);
};

export default ProductDetailPage;
