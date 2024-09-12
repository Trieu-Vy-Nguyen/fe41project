import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsRequest } from '../store/redux/ProductSlice';
import ProductLoading from './ProductLoading';
import ProductItem from './ProductItem';
import { ROUTERS } from '../constants/Routers';

function List() {
	const { products, categories, fetching } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const getProducts = () => {
		dispatch(getProductsRequest());
	};

	useEffect(() => {
		getProducts();
	}, [dispatch]);

	// Lọc và phân loại sản phẩm theo danh mục
	const categorizedProducts = categories.map(category => {
		const filteredProducts = products.filter(product => product.categoryId === category.id);
		return {
			...category,
			products: filteredProducts.slice(0, 8), // Chỉ lấy 8 sản phẩm đầu tiên
		};
	});

	console.log(categorizedProducts, "category.products");
	

	return (
		<div className="container py-10 mx-auto max-w-[1200px]">
			<div className="card">
				<div className="mb-6 text-center">
					<h2 className="text-3xl text-red-400">Danh Mục Sản Phẩm</h2>
				</div>

				{fetching ? (
					<ProductLoading />
				) : (
					<>
						{categorizedProducts.map((category, index) => (
							<div key={category.id} className='text-center'>
								<h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
								<div className="grid grid-cols-1 gap-5 md:grid-cols-4">
									{category.products.map((item) => (
										<ProductItem item={item} key={item.id} />
									))}
								</div>
								{/* Separator line */}
								{index < categorizedProducts.length - 1 && (
									<hr className="my-8 border-t-4 border-gray-300 w-full" />
								)}
							</div>
						))}

					</>
				)}
			</div>
			<div className='flex justify-center mt-10'>
				<button className='px-40 py-5 bg-white text-black hover:text-blue-500 border border-black'>
					<Link className='text-lg font-extrabold' to={ROUTERS.PRODUCTS}>Xem Thêm Đi, Còn Nhiều Lắm !! </Link>
				</button>
			</div>
		</div>
	);
}


export default List;
