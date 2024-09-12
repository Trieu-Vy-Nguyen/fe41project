// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	carts: [],
	billDetails: {},
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			const { id, size, quantity } = action.payload;
			const existingProduct = state.carts.find(
				(item) => item.id === id && item.size === size
			);

			if (existingProduct) {
				existingProduct.quantity += quantity; // Cập nhật số lượng
			} else {
				state.carts.push({
					...action.payload,
					quantity: quantity,
				});
			}
		},
		removeProductToCart: (state, action) => {
			const { id, size } = action.payload;
			const existingProduct = state.carts.find(
				(item) => item.id === id && item.size === size
			);

			if (existingProduct) {
				if (existingProduct.quantity === 1) {
					state.carts = state.carts.filter(
						(item) => !(item.id === id && item.size === size)
					);
				} else {
					existingProduct.quantity -= 1;
				}
			}
		},
		removeAllProductToCart: (state, action) => {
			const { id, size } = action.payload;
			state.carts = state.carts.filter(
				(item) => !(item.id === id && item.size === size)
			);
		},
		resetCart: (state) => {
			state.carts = [];
		},
		setBillDetails: (state, action) => {
			state.billDetails = action.payload;
		},
	},
});

export const {
	addProductToCart,
	removeProductToCart,
	removeAllProductToCart,
	resetCart,
	setBillDetails,
} = cartSlice.actions;

export default cartSlice.reducer;
