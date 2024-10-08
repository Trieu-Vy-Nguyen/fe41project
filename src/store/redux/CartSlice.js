// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { // Định nghĩa trạng thái khởi tạo cho slice này. Gồm
	carts: [], //  Mảng chứa danh sách các sản phẩm trong giỏ hàng.
	billDetails: {}, //  Đối tượng chứa thông tin chi tiết hóa đơn.
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
				existingProduct.quantity += quantity; 
			} else { 
				state.carts.push({
					...action.payload, 
					quantity: quantity,
				});
			}
		},
		removeProductToCart: (state, action) => {
			const { id, size } = action.payload; // Giải nén id và kích thước từ payload của action.
			const existingProduct = state.carts.find( // Tìm sản phẩm trong giỏ hàng.
				(item) => item.id === id && item.size === size
			);
 
			if (existingProduct) { // Nếu sản phẩm tồn tại:
				if (existingProduct.quantity === 1) { //  Nếu số lượng là 1
					state.carts = state.carts.filter( //  Xóa sản phẩm khỏi giỏ hàng.
						(item) => !(item.id === id && item.size === size)
					);
				} else {
					existingProduct.quantity -= 1; // Giảm số lượng của sản phẩm đi 1.
				}
			}
		},
		removeAllProductToCart: (state, action) => {
			const { id, size } = action.payload;
			state.carts = state.carts.filter(
				(item) => !(item.id === id && item.size === size) // Xóa tất cả sản phẩm khỏi giỏ hàng dựa trên id và kích thước.
			);
		},
		resetCart: (state) => {
			state.carts = []; // Đặt giỏ hàng về mảng rỗng, tức là xóa tất cả sản phẩm.
		},
		setBillDetails: (state, action) => {
			state.billDetails = action.payload; // : Cập nhật thông tin chi tiết hóa đơn với dữ liệu từ payload.
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
