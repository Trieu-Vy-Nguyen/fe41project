import storage from 'redux-persist/lib/storage'; 

export const persistConfig = {
	key: 'root', // Chỉ định khóa (key) cho trạng thái được lưu trữ. Tên này sẽ được sử dụng để xác định dữ liệu trong Local Storage. Ở đây, nó được đặt là 'root', nghĩa là tất cả các state sẽ được lưu trữ dưới khóa này.
	storage, // Chỉ định loại storage sẽ sử dụng để lưu trữ trạng thái. Ở đây, nó sử dụng storage mà chúng ta đã nhập ở trên (Local Storage).
	whitelist: ['cart'], //  Định nghĩa danh sách các state mà chúng ta muốn lưu trữ. Chỉ những state có tên trong danh sách này mới được giữ lại khi trạng thái Redux được lưu. Ở đây, chỉ có state cart sẽ được lưu trữ, nghĩa là các state khác sẽ không được lưu lại.
};
