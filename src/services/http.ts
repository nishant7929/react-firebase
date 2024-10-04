import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';
import Config from '../utils/config';

// Create a base Axios instance with the API URL
const baseInstance: AxiosInstance = axios.create({
	baseURL: Config.API_URL,
});

// Define type for headers
type HeadersProps = {
    [key: string]: string;
};
interface APIParamsType {
	method: 'get' | 'post' | 'put' | 'delete';
	route: string;
	body?: object;
	isAuthenticated?: boolean;
	params?: object;
	cancelToken: CancelTokenSource;
}

/**
 * Get an Axios instance based on authentication and request parameters.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param headersProps - Custom headers for the request.
 * @param params - Request parameters.
 * @param cancelToken - Token for cancelling the request.
 * @returns Axios instance.
 */
function getInstance({
	isAuthenticated = false,
	headersProps = {},
	params,
	cancelToken,
}: {
    isAuthenticated?: boolean;
    headersProps?: HeadersProps;
    params?: object;
    cancelToken: CancelTokenSource;
}): AxiosInstance {
	// Create a new Axios instance with cancel token if authenticated
	const instance: AxiosInstance = isAuthenticated
		? axios.create({ ...baseInstance.defaults, cancelToken: cancelToken.token })
		: baseInstance;

	// Set common headers and default params
	instance.defaults.headers.common = headersProps;
	instance.defaults.params = params;
	return instance;
}

/**
 * Make an API call using Axios.
 * @param method - HTTP method (get, post, put, delete).
 * @param route - Request route.
 * @param body - Request body for POST and PUT.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param params - Request parameters.
 * @param cancelToken - Token for cancelling the request.
 * @returns Promise containing Axios response.
 */
function callAPI<T>({
	method,
	route,
	body,
	isAuthenticated = false,
	params,
	cancelToken,
}: APIParamsType): Promise<AxiosResponse<T>> {
	const instance = getInstance({ isAuthenticated, params, cancelToken });

	switch (method) {
		case 'get':
		case 'delete':
			return instance.get<T>(route, { cancelToken: cancelToken.token });
		case 'post':
		case 'put':
			return instance[method]<T>(route, body, { cancelToken: cancelToken.token });
		default:
			throw new Error(`Invalid HTTP method: ${method}`);
	}
}

/**
 * Get a CancelTokenSource instance for cancelling requests.
 * @returns CancelTokenSource instance.
 */
export const getCancelToken = (): CancelTokenSource => axios.CancelToken.source();

/**
 * Object containing methods for making API requests.
 */
export const HTTP = {
	/**
     * Make a GET request.
     */
	Get: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'get' }),

	/**
     * Make a POST request.
     */
	Post: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'post' }),

	/**
     * Make a PUT request.
     */
	Put: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'put' }),

	/**
     * Make a DELETE request.
     */
	Delete: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'delete' }),
};
