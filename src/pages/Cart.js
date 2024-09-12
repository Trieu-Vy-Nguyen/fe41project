import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	removeAllProductToCart,
	removeProductToCart,
} from '../store/redux/CartSlice';
import { Button, Image } from 'antd';
import { CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import Price from '../components/Price';

export const TargetPrice = 2000;

export default function Cart() {
	const carts = useSelector((state) => state.cart.carts);
	const dispatch = useDispatch();

	const addToCart = (product) => {
		dispatch(addProductToCart(product));
	};

	const removeToCart = (product) => {
		dispatch(removeProductToCart(product));
	};

	const removeAllToCart = (product) => {
		dispatch(removeAllProductToCart(product));
	};

	const calculateTotal = () => {
		return carts.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
	};

	const totalPrice = calculateTotal();
	const isFreeShip = TargetPrice <= totalPrice;

	return (
		<main>
			<div className="container grid grid-cols-3 gap-6 py-10 mx-auto">
				<div className="grid col-span-2 p-6 bg-white shadow-md">
					<div className="p-5 border border-dashed border-[#e9e9e9]">
						{isFreeShip ? (
							<p>Bạn đã được freeship</p>
						) : (
							<p>
								Mua thêm{' '}
								<span className="text-red-400">
									<Price value={TargetPrice - totalPrice} />
								</span>{' '}
								để được <strong>Free Ship !!</strong>
							</p>
						)}
					</div>
					<table className="table-auto w-full mt-6 divide-y divide-[#e9e9e9]">
						<thead>
							<tr className="[&_th]:py-4">
								<th></th>
								<th></th>
								<th className="text-left">Sản phẩm</th>
								<th className="text-center">Kích thước</th> {/* Thêm cột Kích thước */}
								<th className="text-center">Giá</th>
								<th className="text-right">Số Lượng</th>
								<th className="text-right">Tổng</th>
							</tr>
						</thead>
						<tbody>
							{carts.map((item) => (
								<tr key={item.id} className="[&_td]:pt-4">
									<td>
										<Button
											type="text"
											className="w-[30px]"
											onClick={() =>
												removeAllToCart(item)
											}
										>
											<CircleX size={16} />
										</Button>
									</td>
									<td>
										<Image
											src={item.image}
											width={120}
											height={120}
										/>
									</td>
									<td className="text-left">{item.name}</td>
									<td className="text-center">{item.size}</td> {/* Hiển thị kích thước */}
									<td className="text-sm text-center">
										<Price value={item.price} />
									</td>
									<td className="text-right">
										<div className="border border-[#d0d0d0] h-[30px] flex flex-row items-center float-right w-[75px]">
											<button
												className="flex items-center justify-center flex-1"
												onClick={() =>
													removeToCart(item)
												}
											>
												<span>-</span>
											</button>
											<div className="flex items-center justify-center flex-1">
												<p>{item.quantity}</p>
											</div>
											<button
												className="flex items-center justify-center flex-1"
												onClick={() => addToCart(item)}
											>
												<span>+</span>
											</button>
										</div>
									</td>
									<td className="text-sm text-right">
										<Price
											value={item.quantity * item.price}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="grid col-span-1 p-6 bg-white shadow-md">
					<div className="flex flex-col justify-between h-full">
						<div className="divide-y divide-[#e9e9e9]">
							<div className="py-5">
								<p className="font-semibold">Tất cả về giỏ hàng</p>
							</div>
							<div className="flex flex-row items-center justify-between py-6">
								<p className="font-semibold">Tất cả về giỏ hàng</p>
								<Price value={totalPrice} />
							</div>
							<div className="py-5 space-y-4">
								<div className="flex flex-row items-center justify-between ">
									<p className="font-semibold">Phụ thu</p>
									<p>$0</p>
								</div>
							</div>
							<div className="flex flex-row items-center justify-between py-5">
								<p className="font-semibold">Tổng :</p>
								<Price value={totalPrice} />
							</div>
						</div>
						<Link to={ROUTERS.CHECKOUT} className="w-full mt-5">
							<Button
								type="primary"
								size="large"
								className="w-full "
							>
								<p>Click để đặt hàng ngay !!</p>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}