import { AppBar, Button, Switch, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logoutUser, toggleTheme } from '../redux/auth/slice';
import { logOutButtonStyle, navTypographyStyle } from './style';

const NavBar = () => {
	const dispatch = useAppDispatch();
	const { theme } = useAppSelector(state => state.user);

	const handleClick = () => {
		dispatch(logoutUser());
	};

	const handleSwitch = () => {
		dispatch(toggleTheme());
	};

	return (
		<>

			<AppBar position="static">
				<Typography
					variant="h6"
					noWrap
					height={45}
					component="div"
					sx={navTypographyStyle}
				>
					<Link style={{ textDecoration: 'none', color: 'white', float: 'left' }} to={'/products'}>Dashboard</Link>
					Theme: <Switch checked={theme === 'dark'} onChange={handleSwitch} />
					<Button sx={logOutButtonStyle} color='inherit' onClick={handleClick}>logout</Button>
				</Typography>
			</AppBar>
		</>
	);
};

export default NavBar;
