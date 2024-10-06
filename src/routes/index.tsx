import React, { Suspense, lazy, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useLocation,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import PrivateRoutes from './protectedRoute';
import ProductDetailPage from '../pages/product/details/Details';
import ReactGA from 'react-ga4';
import SignUp from '../pages/auth/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { handleUserLogin } from '../redux/auth/slice';

const Products = lazy(() => import('../pages/product/products/Products'));
const Login = lazy(() => import('../pages/auth/Login'));
const Create = lazy(() => import('../pages/product/create&update/Create'));
const Update = lazy(() => import('../pages/product/create&update/Update'));

const RouteProvider: React.FC = () => {
	const dispatch = useAppDispatch();
	const { uid } = useAppSelector((state) => state.user);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
					localStorage.setItem('userId', doc.data()?.uid);
					dispatch(handleUserLogin(doc.data()?.uid));
					//   setUser(doc.data());
				});
			} else {
				dispatch(handleUserLogin(''));
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<Router>
				<RouteTracker />
				<Suspense>
					<Routes>
						<Route
							path="/"
							element={
								uid ? (
									<Navigate to="/products" />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />

						<Route element={<PrivateRoutes />}>
							<Route path="/products" element={<Products />} />
							<Route path="/add-product" element={<Create />} />
							<Route path="/update/:id" element={<Update />} />
							<Route
								path="/details/:id"
								element={<ProductDetailPage />}
							/>
						</Route>
					</Routes>
				</Suspense>
			</Router>
		</>
	);
};

export default RouteProvider;

const RouteTracker = () => {
	const location = useLocation();

	useEffect(() => {
		ReactGA.send({ hitType: 'pageview', page: location.pathname });
	}, [location]);

	return null; // No UI to render, only handles the effect
};
