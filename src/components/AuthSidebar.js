import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';

export default memo(function AuthSidebar() {
	return (
		<div className="grid col-span-1 p-6 bg-white shadow-md">
			<div className="flex flex-col justify-between h-full">
				<div className="divide-y divide-[#e9e9e9]">
					<div className="py-3">
						<NavLink
							to={ROUTERS.PROFILE}
							className={(active) => `${active && 'font-bold'} `}
						>
							Hồ sơ
						</NavLink>
					</div>
					<div className="py-3">
						<NavLink
							to={ROUTERS.ORDER_HISTORY}
							className={(active) => `${active && 'font-bold'} `}
						>
							Lịch sử đặt hàng
						</NavLink>
					</div>
					<div className="py-3">
						<NavLink
							to={ROUTERS.PASSWORD}
							className={(active) => `${active && 'font-bold'} `}
						>
							Đổi mật khẩu
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
});
