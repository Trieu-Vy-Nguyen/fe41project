import { call, put } from 'redux-saga/effects';
import { getProductsFailure, getProductsSuccess, } from '../redux/ProductSlice';
import { ServiceApi } from '../../services/Api';

export function* getProducts() {
	try {
		const res = yield call(ServiceApi.getProducts);
		const categoriesRes = yield call(ServiceApi.getCategories);

		if (res.ok && res.status === 200 && categoriesRes.ok && categoriesRes.status === 200) {
			yield put(getProductsSuccess({
				products: res.data,
				categories: categoriesRes.data,
			}));
		} else {
			yield put(getProductsFailure());
		}
	} catch (error) {
		yield put(getProductsFailure());
	}
}

export function* getProductsByCategory(action) {
	try {
		const res = yield call(ServiceApi.getProductsByCategory, action.payload.categoryId);

		if (res.ok && res.status === 200) {
			yield put(getProductsSuccess({
				products: res.data,
			}));
		} else {
			yield put(getProductsFailure());
		}
	} catch (error) {
		yield put(getProductsFailure());
	}
}
