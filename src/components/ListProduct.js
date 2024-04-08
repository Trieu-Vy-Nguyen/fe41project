import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsRequest } from '../store/redux/ProductSlice';
import ProductLoading from './ProductLoading';
import ProductItem from './ProductItem';
import { ROUTERS } from '../constants/Routers';


function List() {
	
	const { products, fetching } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const getProducts = () => {
		dispatch(getProductsRequest());
	};

	useEffect(() => {
		getProducts();
	}, []);


	return (
		<div className="container py-10 mx-auto">
		<div className="card">
			<div className="mb-6 text-center">
				<h2 className="text-3xl"> PRODUCT</h2>
				<h4 className="mt-4">
					Base optimal relaxation unlock my. Asserts too invite
					web cause eow can breakout ocean create.
				</h4>
			</div>

			{fetching ? (
				<ProductLoading />
			) : (
				<div className="grid grid-cols-1 gap-5 md:grid-cols-4">
					{products.map((item) => (
						<ProductItem item={item} key={item.id} />
					))}
				</div>
			)}
		</div>
		<div className='flex justify-center mt-10'>
			<button className='px-20 py-5 bg-black text-white hover:text-blue-500'>
				<Link to={ROUTERS.PRODUCTS}> VIEW MORE </Link>
			</button>
		</div>
	</div>


	);

}

export default List;
