import React, { memo } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../store/redux/AuthSlice';
import emailjs from '@emailjs/browser';

export default memo(function Register() {
	const fetching = useSelector((state) => state.auth.fetching);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const sendConfirmationEmail = (email, name) => {
		const serviceId = 'service_yz3fqlp';
		const templateId = 'template_4ugjjxa';
		const publicKey = 'FvWHXascOz1UHEdje';

		const templateParams = {
			from_name: 'NghienBongDa',
			from_email: email,
			to_name: name,
			message: 'Cảm ơn bạn đã đăng ký! Chúng tôi rất vui mừng khi có bạn trên hệ thống.',
		};

		emailjs.send(serviceId, templateId, templateParams, publicKey)
			.then((response) => {
				console.log('Gửi email thành công!', response);
			})
			.catch((error) => {
				console.error('Lỗi khi gửi email:', error);
			});
	};

	const onFinish = (values) => {
		dispatch(registerRequest(values));
		// Gửi email xác nhận
		sendConfirmationEmail(values.email, `${values.firstname} ${values.lastname}`);
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
					label="Tên"
					rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
				>
					<Input size="large" />
				</Form.Item>
				<Form.Item
					name="lastname"
					label="Họ"
					rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
				>
					<Input size="large" />
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{ type: 'email', message: 'Địa chỉ email không hợp lệ!' },
						{ required: true, message: 'Vui lòng nhập email của bạn!' }
					]}
				>
					<Input size="large" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Mật khẩu"
					rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
					hasFeedback
				>
					<Input.Password size="large" />
				</Form.Item>
				<Form.Item
					name="confirm"
					label="Xác nhận mật khẩu"
					dependencies={['password']}
					hasFeedback
					rules={[
						{ required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Mật khẩu không khớp, vui lòng kiểm tra lại!'));
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
