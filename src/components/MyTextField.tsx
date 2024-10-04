import { TextField } from '@mui/material';
import React from 'react';
import { TextInputProps } from '../types/components/TextField';

const MyTextField: React.FC<TextInputProps> = ({ ...rest }) => {
	return (
		<>
			<TextField
				fullWidth
				size='small'
				{...rest}
			/>
		</>
	);
};

export default MyTextField;
