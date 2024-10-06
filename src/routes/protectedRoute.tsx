import React, { FC } from 'react';
import {  Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivateRoutes: FC = () => {
	const { uid } = useAppSelector((state) => state.user);

	return uid
	  ? <Outlet />
	  : <Navigate to="/login" />;
};

export default PrivateRoutes;
