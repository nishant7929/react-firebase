
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Helmet } from 'react-helmet';
import { userLogin } from '../../redux/auth/thunk';
import MyTextField from '../../components/MyTextField';
import { Form } from '../../types/auth';
import { cardStyle, formBox, loadingButton, mainBox, spanError } from './style';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// Store Data
	const { accessToken, isLoading, error } = useAppSelector(state => state.user);

	const [form, setForm] = useState<Form>({ username: '', password: '' });
	const [errorMessage, setErrorMessage] = useState<Form>({ username: '', password: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.username || !form.password) {
			setErrorMessage({ username: 'Please enter username', password: 'Please enter password' });
			return;
		} else {
			setErrorMessage({ username: '', password: '' });
		}

		// Call Login Api
		dispatch(userLogin(form));

	};

	useEffect(() => {
		if (accessToken) {
			navigate('/products');
		}
	}, [accessToken, error, isLoading, navigate]);

	return (
		<>
			<Helmet>
				<title>login</title>
			</Helmet>

			<Container component='main' maxWidth='xs'>
				<Box sx={mainBox} >
					<Card
						sx={cardStyle}
					>
						<Typography component='h1' variant='h5'>Login</Typography>
						<Box component='form' onSubmit={handleSubmit} sx={formBox}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextField
										label='Username'
										name='username'
										type='text'
										error={!form.username && errorMessage.username !== ''}
										helperText={!form.username && errorMessage.username}
										value={form.username}
										onChange={handleChange} />
								</Grid>
								<Grid item xs={12}>
									<MyTextField
										name='password'
										value={form.password}
										onChange={handleChange}
										label='Password'
										type='password'
										error={!form.password && errorMessage.password !== ''}
										helperText={!form.password && errorMessage.password}
									/>
								</Grid>
							</Grid>
							<LoadingButton type='submit' fullWidth variant='contained' loading={isLoading} sx={loadingButton}>Login</LoadingButton>
							{error && <span style={spanError}>{error}</span>}
						</Box>
						<Box sx={{ alignItems: 'start' }}>
							<Typography>username: emilys</Typography>
							<Typography>password: emilyspass</Typography>
						</Box>
					</Card>
				</Box>
			</Container>
		</>

	);
};

export default Login;
