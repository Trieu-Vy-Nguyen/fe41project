import React, { useEffect, useState } from 'react';
import { ServiceApi } from '../services/Api';
import ProductLoading from '../components/ProductLoading';
import ProductHeader from '../components/ProductHeader';
import ProductSidebar from '../components/ProductSidebar';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { insertObjectIf } from '../utils';
import { Button } from 'antd';

const Products = () => {
	const [searchParams] = useSearchParams(); // Sử dụng hook useSearchParams để lấy các tham số tìm kiếm từ URL.
	const [products, setProducts] = useState([]); //  Khởi tạo trạng thái products để lưu danh sách sản phẩm.
	const [fetching, setFetching] = useState(false); // Khởi tạo trạng thái fetching để theo dõi quá trình lấy dữ liệu (loading).
	const [page, setPage] = useState(1); // Khởi tạo trạng thái page để theo dõi trang hiện tại
	const [hasMore, setHasMore] = useState(true); // Khởi tạo trạng thái hasMore để xác định có còn sản phẩm để tải hay không.

	const getProducts = async (pageNum) => { // Định nghĩa hàm bất đồng bộ getProducts để lấy sản phẩm từ API.
		setFetching(true); //  Đặt trạng thái fetching thành true khi bắt đầu lấy dữ liệu.
		const sort = searchParams.get('sort') || ''; // Lấy tham số sort từ URL, mặc định là chuỗi rỗng nếu không có.
		const sorts = sort.split('-'); // Tách tham số sort thành mảng với ký tự phân cách là -
		const q = searchParams.get('q');
		const categoryId = searchParams.get('categoryId'); // Lấy các tham số tìm kiếm khác như q, categoryId, và priceRange từ URL.
		const priceRange = searchParams.get('price-range');

		const params = {  // Tạo một đối tượng params chứa các tham số để gửi tới API.
			_sort: sorts[0],
			...insertObjectIf(sort, { // Sử dụng hàm để chỉ thêm tham số vào đối tượng nếu nó có giá trị.
				_order: sorts[1],
			}),
			...insertObjectIf(q, { name_like: q }),
			...insertObjectIf(categoryId, { categoryId }),
			...insertObjectIf(priceRange, {
				priceRange: JSON.parse(priceRange),
			}),
			_page: pageNum,
			_limit: 20,
		};

		try {
			const res = await ServiceApi.getProducts(params);
			if (res.ok) {
				if (pageNum === 1) {
					setProducts(res.data); // Đặt lại danh sách sản phẩm nếu là trang đầu tiên
				} else {
					setProducts((prevProducts) => [...prevProducts, ...res.data]); // Thêm sản phẩm mới vào danh sách nếu không phải trang đầu tiên.
				}
				setHasMore(res.data.length > 0); // Đặt trạng thái hasMore dựa trên số lượng sản phẩm trả về.
			} else {
				console.error('Lỗi khi lấy sản phẩm:', res.problem);
				setHasMore(false); // Dừng việc tải thêm nếu có lỗi
			}
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
			setHasMore(false); // Dừng việc tải thêm nếu có lỗi
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		// Khi các tham số tìm kiếm thay đổi, đặt lại trang và danh sách sản phẩm.
		setPage(1);
		setProducts([]);
	}, [searchParams]);

	useEffect(() => {
		getProducts(page); //  Khi trang hoặc các tham số tìm kiếm thay đổi, gọi hàm getProducts để lấy sản phẩm.
	}, [page, searchParams]);
 
	const loadMore = () => { // Hàm để tải thêm sản phẩm.
		if (fetching || !hasMore) return; //  Nếu đang fetching hoặc không còn sản phẩm để tải, không làm gì cả.
		setPage((prevPage) => prevPage + 1); // Tăng số trang hiện tại để tải thêm sản phẩm	
	};
	

	return (
		<div className="container p-16 mx-auto">
			<div className="relative flex flex-row w-full gap-9">
				<ProductSidebar />
				<div className="flex flex-col flex-[3]">
					<ProductHeader />

					{fetching && page === 1 ? (
						<ProductLoading />
					) : (
						<>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-4 mt-5">
								{products.map((item) => (
									<ProductItem key={item.id} item={item} /> // Lặp qua danh sách sản phẩm và hiển thị từng sản phẩm với component ProductItem.
								))}
							</div>

							{hasMore && ( //  Nếu còn sản phẩm để tải, hiển thị nút "Tải thêm".
								<div className="flex justify-center mt-4">
									<Button
										onClick={loadMore}
										loading={fetching}
										className="bg-blue-500 text-white px-4 py-2 rounded"
									>
										Tải thêm
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Products;
