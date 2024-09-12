import React, { memo } from 'react';
import Price from './Price';
import { useNavigate } from 'react-router-dom';

export default memo(function ProductItem({ item }) {
	const navigate = useNavigate()

	return (
		<div className="group transform transition-transform duration-300 ease-out hover:translate-y-[-5px] hover:shadow-lg" onClick={() => {
			navigate(`/products/${item.id}`)
		}}>
			<div className="relative overflow-hidden">
				<img src={item.image} alt={item.name} className="w-full" />
				<img
					src={item.imageHover}
					alt={item.name}
					className="absolute top-0 left-0 z-20 transition-all duration-200 ease-linear opacity-0 group-hover:opacity-100 group-hover:scale-125"
				/>
			</div>
			<div className="pt-4 text-center">
				<p className="font-semibold">{item.name}</p>
				<Price value={item.price} />
			</div>
		</div>
	);
});
