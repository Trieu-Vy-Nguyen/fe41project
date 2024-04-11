import React from 'react';

import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import HeaderCart from './HeaderCart';
import AuthModal from './Modal/AuthModal';
import { Space } from 'antd';



export default function Header() {

	return (
		<>
			<div className=" h-[75px] border border-[rgba(204, 199, 199, 0.35)]  sticky top-0 z-40 bg-black text-white">
				<div className="container flex flex-row items-center justify-between h-full mx-auto">
					<div className=''></div>
					<div className="flex flex-row gap-10">
						<NavLink
							to={ROUTERS.HOME}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Home
						</NavLink>
						<NavLink
							to={ROUTERS.PRODUCTS}
							className={({ isActive }) =>
								`${isActive && 'font-bod'}`
							}
						>
							Products
						</NavLink>
						<NavLink to={ROUTERS.HOME}>
							<img
								src="/images/T1_logo.avif"
								alt=""
								className="w-full h-[50px]"
							/>
						</NavLink>
						<NavLink
							to={ROUTERS.ABOUT}
							className={({ isActive }) =>
								`${isActive && 'font-bod'}`
							}
						>
							About
						</NavLink>
						<NavLink
							to={ROUTERS.CONTACT}
							className={({ isActive }) =>
								`${isActive && 'font-bod'}`
							}
						>
							Contact
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
