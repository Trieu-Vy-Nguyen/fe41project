import { createSlice } from '@reduxjs/toolkit';

const initialState = { // Định nghĩa trạng thái khởi tạo cho slice này. Gồm:
	products: [], // : Mảng chứa danh sách sản phẩm.
	categories: [], // : Mảng chứa danh sách danh mục sản phẩm.
	fetching: false, // Biến boolean cho biết liệu có đang trong quá trình lấy dữ liệu hay không.
}; 

export const productSlice = createSlice({ // Tạo một slice mới tên là product
	name: 'product',  //  Đặt tên cho slice, giúp dễ dàng xác định trong Redux devtools.
	initialState, // Sử dụng trạng thái khởi tạo đã định nghĩa ở trên.
	reducers: { //  Định nghĩa các reducers cho slice này.
		getProductsRequest: (state) => {
			state.fetching = true; //  Khi action này được gọi, trạng thái fetching sẽ được đặt thành true, biểu thị rằng quá trình lấy dữ liệu đã bắt đầu.
		},
		getProductsSuccess: (state, action) => {
			state.products = action.payload.products; // Cập nhật danh sách sản phẩm trong state với dữ liệu từ payload của action.
			state.categories = action.payload.categories; // Cập nhật danh sách danh mục trong state với dữ liệu từ payload của action.
			state.fetching = false; // Đặt lại trạng thái fetching thành false, biểu thị rằng quá trình lấy dữ liệu đã hoàn thành.
		},
		getProductsFailure: (state) => {
			state.products = []; // Đặt danh sách sản phẩm thành mảng rỗng khi có lỗi.
			state.categories = []; //  Đặt danh sách danh mục thành mảng rỗng khi có lỗi.
			state.fetching = false; // Đặt lại trạng thái fetching thành false.
		},
	},
});

export const { getProductsRequest, getProductsSuccess, getProductsFailure } = productSlice.actions; // Xuất ra các action creator tương ứng với các reducer đã định nghĩa, để có thể sử dụng chúng ở nơi khác trong ứng dụng.
 
export default productSlice.reducer; //  Xuất reducer của slice này để có thể được sử dụng trong việc cấu hình store của Redux.
