import { call, put } from 'redux-saga/effects';
import { getProductsFailure, getProductsSuccess, } from '../redux/ProductSlice';
import { ServiceApi } from '../../services/Api';

export function* getProducts() { // lấy danh sách sản phẩm.
	try {
		const res = yield call(ServiceApi.getProducts); // Gọi phương thức getProducts từ ServiceApi, sử dụng call để chờ kết quả trả về. Kết quả được lưu vào biến res.
		const categoriesRes = yield call(ServiceApi.getCategories); //  gọi phương thức getCategories để lấy danh sách danh mục sản phẩm và lưu kết quả vào categoriesRes.

		if (res.ok && res.status === 200 && categoriesRes.ok && categoriesRes.status === 200) { // Kiểm tra xem cả hai yêu cầu API đã thành công hay chưa (tức là nhận được mã trạng thái 200 và không có lỗi).
			yield put(getProductsSuccess({ // Nếu cả hai yêu cầu thành công, gửi action getProductsSuccess với payload chứa dữ liệu sản phẩm và danh mục vào Redux store.
				products: res.data,
				categories: categoriesRes.data,
			}));
		} else {
			yield put(getProductsFailure()); //  Nếu một trong hai yêu cầu không thành công, gửi action getProductsFailure để báo cáo lỗi.
		}
	} catch (error) {
		yield put(getProductsFailure()); // Gửi action getProductsFailure để báo cáo lỗi.
	}
}

export function* getProductsByCategory(action) { //  Định nghĩa một generator function tên là getProductsByCategory, nhận một action làm tham số. Action này thường chứa thông tin về danh mục sản phẩm.
	try { 
		const res = yield call(ServiceApi.getProductsByCategory, action.payload.categoryId); 
		// Gọi phương thức getProductsByCategory từ ServiceApi, truyền vào categoryId từ payload của action để lấy danh sách sản phẩm theo danh mục.
		if (res.ok && res.status === 200) {
			yield put(getProductsSuccess({  // Nếu yêu cầu thành công, gửi action getProductsSuccess với dữ liệu sản phẩm vào Redux store.
				products: res.data,
			}));
		} else {
			yield put(getProductsFailure()); // Nếu không thành công, gửi action getProductsFailure để báo lỗi.
		}
	} catch (error) {
		yield put(getProductsFailure());
	}
}
