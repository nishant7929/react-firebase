import React from 'react';

export interface TextInputProps {
	label?: string;
	name?: string;
	value: string | number | null;
	type?: string;
	error?: boolean | boolean;
	helperText?: string | boolean | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
