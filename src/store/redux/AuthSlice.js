import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'; 

const initialState = {
	user: null, // Thông tin người dùng, khởi tạo là null.
	token: null, // Mã thông báo xác thực (access token), khởi tạo là null.
	fetching: false, // Trạng thái đang tải dữ liệu (loading), khởi tạo là false.
	isShowAuthModal: false, // Trạng thái hiển thị modal xác thực, khởi tạo là false.
};

export const authSlice = createSlice({
	name: 'auth',
	initialState, // Sử dụng trạng thái khởi tạo đã định nghĩa ở trên.
	reducers: {
		loginRequest: (state) => {
			state.fetching = true; // Đặt trạng thái fetching thành true, cho biết quá trình đăng nhập đang diễn ra.
		},
		loginSuccess: (state, action) => {
			state.user = action.payload.user; // Cập nhật thông tin người dùng từ payload.
			state.token = action.payload.accessToken; //  Cập nhật mã thông báo xác thực từ payload
			state.fetching = false; // Đặt trạng thái fetching thành false, kết thúc quá trình đăng nhập.
		},
		loginFailure: (state) => {
			state.user = null; // Đặt thông tin người dùng về null.
			state.token = null; // Đặt mã thông báo xác thực về null.
			state.fetching = false; // Đặt trạng thái fetching thành false.
		},
		registerRequest: (state) => {
			state.fetching = true; //  Đặt trạng thái fetching thành true, cho biết quá trình đăng ký đang diễn ra.
		},
		registerSuccess: (state, action) => {
			state.user = action.payload.user; //  Cập nhật thông tin người dùng từ payload.
			state.token = action.payload.accessToken; // Cập nhật mã thông báo xác thực từ payload.
			state.fetching = false; //  Đặt trạng thái fetching thành false.
		},
		registerFailure: (state) => {
			state.user = null; // Đặt thông tin người dùng về null.
			state.token = null; // Đặt mã thông báo xác thực về null.
			state.fetching = false; //  Đặt trạng thái fetching thành false.
		},
		logoutRequest: (state) => {
			state.user = null; // Đặt thông tin người dùng về null, tức là người dùng đã đăng xuất.
			state.token = null; // Đặt mã thông báo xác thực về null.
			state.fetching = false; //  Đặt trạng thái fetching thành false.
		},
		updateUserRequest: (state) => {
			state.fetching = true; // Đặt trạng thái fetching thành true, cho biết quá trình cập nhật thông tin người dùng đang diễn ra.
		},
		updateUserSuccess: (state, action) => {
			state.user = action.payload; // Cập nhật thông tin người dùng từ payload.
			state.fetching = false; // Đặt trạng thái fetching thành false.
		},
		updateUserFailure: (state) => {
			state.fetching = false;
		},
		setShowAuthModal: (state, action) => {
			state.isShowAuthModal = action.payload; //  Cập nhật trạng thái hiển thị modal xác thực với giá trị từ payload.
		},
	},
});


export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	registerRequest,
	registerSuccess,
	registerFailure,
	logoutRequest,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
	setShowAuthModal,
} = authSlice.actions;

export const AUTH_PERSIST_KEY = 'authPersist'; //  Định nghĩa một khóa để lưu trữ trạng thái xác thực, có thể được sử dụng trong Redux Persist.


export const AuthReducer = persistReducer(
	{
		storage, // Sử dụng Local Storage để lưu trữ.
		key: AUTH_PERSIST_KEY, // Sử dụng khóa đã định nghĩa trước đó.
		whitelist: ['token', 'user'], // Chỉ định rằng chỉ có token và user sẽ được lưu trữ khi persist.
	},
	authSlice.reducer
);

export default AuthReducer;
