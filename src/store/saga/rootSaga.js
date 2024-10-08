import { takeLatest, all } from 'redux-saga/effects';
import { getProductsRequest } from '../redux/ProductSlice';
import { getProducts } from './ProductSaga';
import {
	loginRequest,
	registerRequest,
	updateUserRequest,
} from '../redux/AuthSlice';
import { login, register, updateUser } from './AuthSaga';

export default function* rootSaga() {
	yield all([takeLatest(getProductsRequest.type, getProducts)]); 
	yield all([takeLatest(loginRequest.type, login)]);
	yield all([takeLatest(registerRequest.type, register)]);
	yield all([takeLatest(updateUserRequest.type, updateUser)]);
}


// takeLatest: Đây là một hiệu ứng (effect) của redux-saga được sử dụng để lắng nghe các action và chỉ chạy saga cho hành động mới nhất. Nếu có nhiều action được gửi đi trong thời gian ngắn, chỉ saga của action cuối cùng được thực hiện, các hành động trước sẽ bị hủy.
// all: Đây là một hiệu ứng redux-saga khác, cho phép chúng ta chạy nhiều saga song song. Nó chờ tất cả các saga được liệt kê hoàn thành trước khi tiếp tục

// getProductsRequest.type: Đây là kiểu của action getProductsRequest, action này được kích hoạt khi muốn lấy danh sách sản phẩm.
// getProducts: Đây là hàm saga được gọi khi action getProductsRequest xảy ra. Saga này có thể thực hiện việc gọi API để lấy danh sách sản phẩm từ server.

// loginRequest.type: Đây là kiểu của action loginRequest, action này được kích hoạt khi người dùng thực hiện đăng nhập.
// login: Đây là hàm saga sẽ thực hiện logic đăng nhập, chẳng hạn như gọi API để xác thực người dùng.

// registerRequest.type: Đây là kiểu của action registerRequest, action này được kích hoạt khi người dùng thực hiện đăng ký tài khoản.
// register: Đây là saga để xử lý việc đăng ký người dùng mới, có thể bao gồm gửi dữ liệu đăng ký đến server và nhận kết quả.

// updateUserRequest.type: Đây là kiểu của action updateUserRequest, được kích hoạt khi người dùng cập nhật thông tin tài khoản
// updateUser: Đây là saga để xử lý việc cập nhật thông tin người dùng, như gọi API để lưu các thay đổi của người dùng trên server