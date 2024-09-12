import React, { memo } from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../store/redux/AuthSlice';

export default memo(function Register() {
	const fetching = useSelector((state) => state.auth.fetching);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		dispatch(registerRequest(values));
	};

	return (
		<div>
			<Form
				form={form}
				name="register"
				layout="vertical"
				onFinish={onFinish}
				style={{ width: '100%' }}
				scrollToFirstError
			>
				<Form.Item
					name="firstname"
					label="First Name"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập họ của bạn !',
						},
					]}
				>
					<Input size="large" className="" />
				</Form.Item>
				<Form.Item
					name="lastname"
					label="Last Name"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập tên của bạn !',
						},
					]}
				>
					<Input size="large" className="" />
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Vui lòng nhập email của bạn !',
						},
					]}
				>
					<Input size="large" className="" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập password của bạn !',
						},
					]}
					hasFeedback
				>
					<Input.Password size="large" />
				</Form.Item>
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Vui lòng xác nhận password của bạn !',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										'Password không khớp , bạn hãy kiểm tra lại !'
									)
								);
							},
						}),
					]}
				>
					<Input.Password size="large" />
				</Form.Item>
				<Button type="primary" htmlType="submit" loading={fetching}>
					Đăng ký
				</Button>
			</Form>
		</div>
	);
});
