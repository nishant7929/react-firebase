
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../redux/store';
import { Helmet } from 'react-helmet';
// import { userLogin } from '../../redux/auth/thunk';
import MyTextField from '../../components/MyTextField';
import { Form } from '../../types/auth';
import { cardStyle, formBox, loadingButton, mainBox, spanError } from './style';
import { signUp } from '../../firebase/auth';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	// Store Data
	const { uid } = useAppSelector(state => state.user);

	const [form, setForm] = useState<Form>({ email: '', password: '' });
	const [errorMessage, setErrorMessage] = useState<Form>({ email: '', password: '' });
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();

		if (!form.email || !form.password) {
			setErrorMessage({ email: 'Please enter email', password: 'Please enter password' });
			setLoading(false);
			return;
		} else {
			setErrorMessage({ email: '', password: '' });
		}

		const response = await signUp(form.email, form.password, form);
		if (!response.success) {
			setError(
				response.error?.message || 'Sign-in failed. Please try again.',
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (uid) {
			navigate('/products');
		}
	}, [uid, error, navigate]);

	return (
		<>
			<Helmet>
				<title>Sign Up</title>
			</Helmet>

			<Container component='main' maxWidth='xs'>
				<Box sx={mainBox} >
					<Card
						sx={cardStyle}
					>
						<Typography component='h1' variant='h5'>Sign Up</Typography>
						<Box component='form' onSubmit={handleSubmit} sx={formBox}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextField
										label='email'
										name='email'
										type='text'
										error={!form.email && errorMessage.email !== ''}
										helperText={!form.email && errorMessage.email}
										value={form.email}
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
							<LoadingButton type='submit' fullWidth variant='contained' loading={loading} sx={loadingButton}>Sign Up</LoadingButton>
							{error && <span style={spanError}>{error}</span>}
						</Box>
						<Box sx={{ alignItems: 'start' }}>
							Already have account?{' '}
							<Link to={'/login'}>Login</Link>
						</Box>
					</Card>
				</Box>
			</Container>
		</>

	);
};

export default SignUp;
