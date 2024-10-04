import { Theme } from '@mui/material';

export const buttonStyle = (theme: Theme) => ({
	backgroundColor: theme.palette.primary.main
});

export const mainCardStyle = {
	maxWidth: 1000,
	margin: 'auto',
	marginTop: 15
};

export const thumbnailErrorStyle = {
	color: 'red',
	marginLeft: '10px'
};

export const imagePreviewStyle = {
	height: '100px',
	marginLeft: '20px'
};
