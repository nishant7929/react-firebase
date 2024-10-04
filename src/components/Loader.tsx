import { CircularProgress } from '@mui/material';
import React from 'react';
import { loaderStyle } from './style';

const Loader: React.FC = () => {
	return (
		<>
			<div style={loaderStyle}>
				<CircularProgress />
			</div>
		</>
	);
};

export default Loader;
