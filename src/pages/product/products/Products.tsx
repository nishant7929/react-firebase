import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { deleteProduct, filterProduct } from '../../../redux/product/thunk';
import { Box, Button, Grid, Pagination, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { contentBoxStyle, h2Style, mainDivStyle, paginationDivStyle, topDivStyle } from './style';

const itemPerPage = 5;

const Products: React.FC = () => {
	const dispatch = useAppDispatch();

	// Store Data
	const { products, isLoading, total } = useAppSelector(state => state.product);

	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [pagination, setPagination] = useState<{ limit: number, skip: number }>({ limit: itemPerPage, skip: 0 });

	useEffect(() => {
		dispatch(filterProduct({ limit: pagination.limit, skip: pagination.skip, searchInput: search }));
	}, [dispatch, pagination.skip, search]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		const skip = (page - 1) * itemPerPage;
		setPage(page);
		setPagination({ ...pagination, skip: skip });
	};

	const handleDelete = (id: number) => {
		dispatch(deleteProduct(id));
		dispatch(filterProduct({ limit: pagination.limit, skip: pagination.skip, searchInput: search }));
	};

	const columns: GridColDef[] = [
		// { field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'image',
			headerName: 'Image',
			width: 200,
			renderCell: (params) => <img src={params.value} alt={params.value} style={{ width: '150px', height: '100px' }} />
		},
		{ field: 'title', headerName: 'Title', width: 170 },
		{ field: 'description', headerName: 'Description', width: 200 },
		{ field: 'category', headerName: 'Category', width: 180, },
		{ field: 'brand', headerName: 'Brand', type: 'string', width: 80, },
		{ field: 'stock', headerName: 'Stock', type: 'number', width: 100, },
		{ field: 'price', headerName: 'Price', type: 'number', width: 70 },
		{ field: 'discountPercentage', headerName: 'Discount %', type: 'number', width: 100, },
		{ field: 'rating', headerName: 'Rating', type: 'number', width: 90, },
		{
			field: '',
			headerName: 'Action',
			width: 250,
			renderCell: (params) => <>
				<Link to={'/details/' + params.row.id}><Button><InfoIcon /></Button></Link>
				<Link to={'/update/' + params.row.id}><Button><EditIcon /></Button></Link>
				<Button onClick={() => handleDelete(params.row.id)} color={'error'}><DeleteIcon /></Button>
			</>
		},
	];

	return (
		<>
			<Helmet>
				<title>Products</title>
			</Helmet>

			<NavBar />

			<div style={mainDivStyle}>
				<div style={topDivStyle}>
					<h2 style={h2Style}>Products</h2>

					{/* Search */}
					<Grid container item xs={3}>
						<TextField
							fullWidth
							label="Search"
							name="search"
							value={search}
							size='small'
							onChange={handleChange}
						/>
					</Grid>

					<Link to='/add-product' ><Button variant='outlined' sx={{ mr: 5 }}>Add Product</Button></Link>
				</div>

				<Box sx={contentBoxStyle}>

					{/* Table Data */}
					<DataGrid
						loading={isLoading}
						autoHeight
						rows={products}
						columns={columns}
						getRowHeight={() => 110}
						hideFooterPagination
					/>
					<div style={paginationDivStyle}>

						{/* Pagination */}
						<Pagination
							count={Math.ceil(total / itemPerPage)}
							page={page}
							onChange={handlePageChange}
							variant="outlined"
							shape="rounded"
							sx={paginationDivStyle}
						/>
					</div>
				</Box>
			</div>

		</>
	);
};

export default Products;
