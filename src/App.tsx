import './App.css';
import React from 'react';
import RouteProvider from './routes';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, PaletteMode, createTheme } from '@mui/material';
import { useAppSelector } from './redux/store';
import { blue, red } from '@mui/material/colors';


function App() {
	interface Theme {
		palette: {
			mode: PaletteMode | undefined;
		}
	}
	const { theme } = useAppSelector(state => state.user);

	const themeColor: Theme = createTheme({
		palette: {
			mode: theme as PaletteMode,
			primary: {
				main: blue[500]
			},
			secondary: {
				main: red[500]
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					outlinedPrimary: {
						borderRadius: 10
					},
					containedPrimary: {
						borderRadius: 10
					}
				}
			}
		}
	});

	return (
		<>
			<div className="App">
				<ThemeProvider theme={themeColor} >
					<CssBaseline />
					<RouteProvider />
				</ThemeProvider>
			</div>
		</>
	);
}

export default App;
