import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../redux/store';
import { Helmet } from 'react-helmet';
import MyTextField from '../../components/MyTextField';
import { Form } from '../../types/auth';
import { cardStyle, formBox, loadingButton, mainBox, spanError } from './style';
import { signIn } from '../../firebase/auth';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [loginLoading, setLoginLoading] = useState(false);

	const { uid } = useAppSelector((state) => state.user);

	const [form, setForm] = useState<Form>({ email: '', password: '' });
	const [errorMessage, setErrorMessage] = useState<Form>({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		setLoginLoading(true);
		e.preventDefault();

		if (!form.email || !form.password) {
			setErrorMessage({
				email: 'Please enter email',
				password: 'Please enter password',
			});
			setLoginLoading(false);
			return;
		} else {
			setErrorMessage({ email: '', password: '' });
		}

		const response = await signIn(form.email, form.password);
		if (!response.success) {
			setError(
				response.error?.message || 'Sign-in failed. Please try again.',
			);
		}
		setLoginLoading(false);
	};

	useEffect(() => {
		if (uid) {
			navigate('/products');
		}
	}, [uid, error, navigate]);

	return (
		<>
			<Helmet>
				<title>login</title>
			</Helmet>

			<Container component="main" maxWidth="xs">
				<Box sx={mainBox}>
					<Card sx={cardStyle}>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={formBox}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextField
										label="email"
										name="email"
										type="text"
										error={
											!form.email &&
											errorMessage.email !== ''
										}
										helperText={
											!form.email && errorMessage.email
										}
										value={form.email}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextField
										name="password"
										value={form.password}
										onChange={handleChange}
										label="Password"
										type="password"
										error={
											!form.password &&
											errorMessage.password !== ''
										}
										helperText={
											!form.password &&
											errorMessage.password
										}
									/>
								</Grid>
							</Grid>
							<LoadingButton
								type="submit"
								fullWidth
								variant="contained"
								loading={loginLoading}
								sx={loadingButton}
							>
								Login
							</LoadingButton>
							{error && <span style={spanError}>{error}</span>}
						</Box>
						<Box sx={{ alignItems: 'start' }}>
							Don&apos;t have account?{' '}
							<Link to={'/signup'}>sign up</Link>
						</Box>
					</Card>
				</Box>
			</Container>
		</>
	);
};

export default Login;
