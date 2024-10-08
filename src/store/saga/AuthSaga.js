import { call, put } from 'redux-saga/effects';
import {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	setShowAuthModal,
	updateUserFailure,
	updateUserSuccess,
} from '../redux/AuthSlice';
import { ServiceApi } from '../../services/Api';
import { message } from 'antd';


export function* login(action) {
	try {
		const res = yield call(ServiceApi.login, { // Gọi phương thức login từ ServiceApi, truyền vào email và mật khẩu từ payload của action, và chờ đợi kết quả trả về.
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 200) {
			yield put(loginSuccess(res.data)); // Nếu thành công, gửi action loginSuccess với dữ liệu người dùng từ phản hồi API vào Redux store.
		
			yield put(setShowAuthModal(false)); // Đóng modal đăng nhập sau khi đăng nhập thành công.
		} else {
			message.error(res.data);
			yield put(loginFailure()); // Nếu không thành công, hiển thị thông báo lỗi và gửi action loginFailure.
		}
	} catch (error) {
		message.error(error.message);
		yield put(loginFailure());
	}
}

export function* register(action) {
	try {
		const res = yield call(ServiceApi.register, { //  Gọi phương thức register từ ServiceApi, truyền vào thông tin người dùng từ payload của action, và chờ đợi kết quả trả về.
			firstname: action.payload.firstname,
			lastname: action.payload.lastname,
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 201) {
			yield put(registerSuccess(res.data)); //  Nếu thành công, gửi action registerSuccess với dữ liệu người dùng vào Redux store.
			
			yield put(setShowAuthModal(false)); // Đóng modal đăng ký sau khi đăng ký thành công.
			
		} else {
			message.error(res.data);
			yield put(registerFailure()); // Nếu không thành công, hiển thị thông báo lỗi và gửi action registerFailure.
		}
	} catch (error) {
		message.error(error.message);
		yield put(registerFailure());
	}
}

export function* updateUser(action) {
	try {
		const res = yield call(ServiceApi.updateUser, action.payload.id, { //  Gọi phương thức updateUser từ ServiceApi, truyền vào ID người dùng và thông tin cập nhật, và chờ đợi kết quả trả về.
			email: action.payload.email,
			firstname: action.payload.firstname,
			lastname: action.payload.lastname,
		});
		if (res.ok && res.status === 200) {
			yield put(
				updateUserSuccess({ // Nếu thành công, gửi action updateUserSuccess với dữ liệu đã cập nhật vào Redux store.
					...action.payload,
				})
			);
			message.success('Updated profile successfully');
		} else {
			message.error(res.data);
			yield put(updateUserFailure()); // Nếu không thành công, hiển thị thông báo lỗi và gửi action updateUserFailure.
		}
	} catch (error) {
		message.error(error.message);
		yield put(updateUserFailure());
	}
}
