import React, { FC } from 'react';
import {  Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivateRoutes: FC = () => {
	const Token = useAppSelector((state) => state.user.accessToken);

	return Token
	  ? <Outlet />
	  : <Navigate to="/login" />;
};

export default PrivateRoutes;
