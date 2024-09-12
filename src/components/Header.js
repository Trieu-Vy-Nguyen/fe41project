import React from 'react';

import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import HeaderCart from './HeaderCart';
import AuthModal from './Modal/AuthModal';
import { Space } from 'antd';



export default function Header() {

	return (
		<>
			<div className=" h-[75px] border border-[rgba(204, 199, 199, 0.35)]  sticky top-0 z-40 bg-white text-black">
				<div className="container flex flex-row items-center justify-between h-full mx-auto max-w-[1200px]">
					<div className=''>
						<NavLink to={ROUTERS.HOME}>
							<img
								src="https://theme.hstatic.net/200000580329/1000937158/14/logo.png?v=96"
								alt=""
								className="w-full h-[50px]"
							/>
						</NavLink>
					</div>
					<div className="flex flex-row gap-10">
						<NavLink
							to={ROUTERS.HOME}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Trang chủ
						</NavLink>
						<NavLink
							to={ROUTERS.PRODUCTS}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Sản Phẩm
						</NavLink>

						<NavLink
							to={ROUTERS.ABOUT}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Dịch vụ
						</NavLink>
						<NavLink
							to={ROUTERS.CONTACT}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Đặt áo đội
						</NavLink>

					</div>
					<Space>
						<AuthModal />
						<HeaderCart />
					</Space>
				</div>
			</div>

		</>
	);
}
