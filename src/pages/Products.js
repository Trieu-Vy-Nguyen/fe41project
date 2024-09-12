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
	const [searchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const [fetching, setFetching] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const getProducts = async (pageNum) => {
		setFetching(true);
		const sort = searchParams.get('sort') || '';
		const sorts = sort.split('-');
		const q = searchParams.get('q');
		const categoryId = searchParams.get('categoryId');
		const priceRange = searchParams.get('price-range');

		const params = {
			...insertObjectIf(sort, {
				_sort: sorts[0],
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
					setProducts((prevProducts) => [...prevProducts, ...res.data]); // Thêm sản phẩm mới vào danh sách
				}
				setHasMore(res.data.length > 0);
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
		// Đặt lại trang và danh sách sản phẩm khi searchParams thay đổi
		setPage(1);
		setProducts([]);
	}, [searchParams]);

	useEffect(() => {
		getProducts(page);
	}, [page, searchParams]);

	const loadMore = () => {
		if (fetching || !hasMore) return;
		setPage((prevPage) => prevPage + 1);
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
									<ProductItem key={item.id} item={item} /> 
								))}
							</div>

							{hasMore && (
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
