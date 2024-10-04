import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-BP5004CP43');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store} >
		<App />
	</Provider>

);

reportWebVitals();
