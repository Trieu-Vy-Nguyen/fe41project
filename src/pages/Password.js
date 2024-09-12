import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message } from 'antd';
import { updateUserRequest } from '../store/redux/AuthSlice';
import { ServiceApi } from '../services/Api';

export default function Password() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const isSubmitting = useSelector((state) => state.auth.fetching);

	const [form] = Form.useForm();
	const [oldPasswordValid, setOldPasswordValid] = useState(true);

	const onFinish = async (values) => {
		if (!user) return;
	
		try {
			// Gọi API để xác thực mật khẩu cũ
			const response = await ServiceApi.validateOldPassword(user.id, { oldPassword: values.oldPassword });
	
			// Nếu mật khẩu cũ không đúng, trả về thông báo lỗi
			if (!response.ok) {
				setOldPasswordValid(false);
				return;
			}
	
			// Mật khẩu cũ đúng, tiếp tục cập nhật mật khẩu mới
			setOldPasswordValid(true);
			dispatch(updateUserRequest({ id: user.id, password: values.newPassword }));
			message.success('Cập nhật mật khẩu thành công');
		} catch (error) {
			// Nếu có lỗi hệ thống (mạng, server...), hiển thị thông báo chung
			message.error('Có lỗi xảy ra khi cập nhật mật khẩu');
		}
		console.log(values);
	};
	
	

	return (
		<div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)] max-w-[1200px] ">
			<div className="p-6 bg-white shadow-md">
				<p className="text-3xl text-center">Đổi Mật Khẩu</p>
				<Form
					size="large"
					form={form}
					layout="vertical"
					onFinish={onFinish}
				>
					{/* Bỏ thuộc tính disabled để người dùng có thể nhập mật khẩu cũ */}
					<Form.Item
						name="oldPassword"
						label="Mật khẩu cũ"
						rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
					>
						<Input.Password />
					</Form.Item>
					{/* Thông báo lỗi nếu mật khẩu cũ không khớp */}
					{!oldPasswordValid && (
						<p className="text-red-500">Mật khẩu cũ không đúng!</p>
					)}

					<Form.Item
						name="newPassword"
						label="Mật khẩu mới"
						rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirmPassword"
						label="Xác nhận mật khẩu mới"
						rules={[
							{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu không khớp!'));
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>

					

					<Button
						type="primary"
						htmlType="submit"
						loading={isSubmitting}
						className="w-full mt-5"
					>
						Lưu
					</Button>
				</Form>
			</div>
		</div>
	);
}
