import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	categories: [],
	fetching: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProductsRequest: (state) => {
			state.fetching = true;
		},
		getProductsSuccess: (state, action) => {
			state.products = action.payload.products;
			state.categories = action.payload.categories;
			state.fetching = false;
		},
		getProductsFailure: (state) => {
			state.products = [];
			state.categories = [];
			state.fetching = false;
		},
	},
});

export const { getProductsRequest, getProductsSuccess, getProductsFailure } = productSlice.actions;

export default productSlice.reducer;
