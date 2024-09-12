import { create } from 'apisauce';

const createServiceApi = () => {
	const api = create({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 10000,
		baseURL: process.env.REACT_APP_API_URL,
	});

	const validateOldPassword = (id, payload) => api.post(`/users/${id}/password`, payload);

	const login = async (payload) => api.post('/login', payload);

	const register = async (payload) => api.post('/register', payload);

	const getProducts = (params) => api.get('/products', { params });

	const getCategories = () => api.get('/categories');

	const getProductsByCategory = (categoryId) => api.get(`/categories/${categoryId}/products`);

	const getProductById = (productId) => api.get(`/products/${productId}`);

	const getOrders = (params) => api.get('/orders', { params });

	const deleteOrders = (orderId) => api.delete('/orders/' + orderId);

	const createOrder = (payload) => api.post('/orders', payload);

	const createOrderDetails = (payload) => api.post('/orderDetails', payload);

	const updateUser = (id, payload) => api.patch(`/users/${id}`, {
		...payload,
		password: payload.password ? payload.password : undefined
	});

	const getUserById = (id) => api.get('/users/' + id);

	return {
		api,
		login,
		register,
		getProducts,
		getCategories,
		getProductsByCategory,
		getProductById,
		createOrder,
		createOrderDetails,
		getOrders,
		deleteOrders,
		updateUser,
		getUserById,
		validateOldPassword,
	};
};

export const ServiceApi = createServiceApi();
