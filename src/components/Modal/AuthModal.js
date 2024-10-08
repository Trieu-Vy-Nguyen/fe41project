import React, { memo, useEffect, useState } from 'react';
import { Button, Modal, Tabs, message, Dropdown, Space } from 'antd';
import { User } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import { useSelector } from 'react-redux';
import { ChevronDown, Power } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutRequest, setShowAuthModal } from '../../store/redux/AuthSlice';
import { modal } from '../Layout';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/Routers';

const Auth = () => {
	const { user, isShowAuthModal } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const showModal = () => {
		dispatch(setShowAuthModal(true));
	};

	const handleCancel = () => {
		dispatch(setShowAuthModal(false));
	};

	const onClick = ({ key }) => {
		if (key === '1') {
			navigate(ROUTERS.PROFILE);
		}
		if (key === '2') {
			navigate(ROUTERS.ORDER_HISTORY);
		}
		if (key === '3') {
			modal.confirm({
				title: 'Logging Out',
				content: 'Bạn có muốn đăng xuất không?',
				onOk() {
					dispatch(logoutRequest());
				},
				onCancel() {},
			});
		}
	};

	const items = [
		{
			label: 'Hồ Sơ',
			key: '1',
		},
		{
			label: 'Lịch sử đặt hàng',
			key: '2',
		},
		{
			label: 'Đăng xuất',
			key: '3',
		},
	];

	return (
		<>
			{user ? (
				<Dropdown menu={{ items, onClick }}>
					<Space>
						<p className='text-black'>
							{user.firstname} {user.lastname}
						</p>
						<ChevronDown size={16} />
					</Space>
				</Dropdown>
			) : (
				<Button type="text" onClick={showModal}>
					<User color="black" size={20} />
				</Button>
			)}

			<Modal open={isShowAuthModal} onCancel={handleCancel} footer={[]}>
				<Tabs
					defaultActiveKey="2"
					items={[
						{
							key: 1,
							label: `Đăng Nhập`,
							children: <Login />,
						},
						{
							key: 2,
							label: `Đăng Ký`,
							children: <Register />,
						},
					]}
				/>
			</Modal>
		</>
	);
};

export default memo(Auth);
