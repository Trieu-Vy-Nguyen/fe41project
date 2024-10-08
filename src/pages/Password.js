import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message } from 'antd';
import AuthSidebar from '../components/AuthSidebar'; // Reuse the AuthSidebar component
import { ServiceApi } from '../services/Api';
import { updateUserRequest, setShowAuthModal , loginSuccess } from '../store/redux/AuthSlice';

export default function Password() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isSubmitting = useSelector((state) => state.auth.fetching);

    const [form] = Form.useForm();
    const [oldPasswordValid, setOldPasswordValid] = useState(true);

    useEffect(() => {
        if (!user) {
            dispatch(setShowAuthModal(true));
        }
    }, [user]);

	const onFinish = async (values) => {
		if (!user) return;
	
		try {
			// Gọi API đăng nhập với mật khẩu cũ
			const loginResponse = await ServiceApi.login({
				email: user.email,
				password: values.oldPassword,
			});
	
			if (loginResponse.ok && loginResponse.status === 200) {
				// Mật khẩu cũ đúng, thực hiện cập nhật mật khẩu mới
				setOldPasswordValid(true); //  Đặt trạng thái mật khẩu cũ là hợp lệ
				await ServiceApi.updateUser(user.id, { password: values.newPassword }); // Gọi API để cập nhật mật khẩu mới.
				message.success('Cập nhật mật khẩu thành công');
	
				// Đăng nhập lại với mật khẩu mới
				const reLoginResponse = await ServiceApi.login({
					email: user.email,
					password: values.newPassword,
				});
	
				if (reLoginResponse.ok && reLoginResponse.status === 200) { // Nếu đăng nhập lại thành công, cập nhật thông tin người dùng vào Redux store.
					// Cập nhật lại thông tin người dùng và token mới
					dispatch(loginSuccess(reLoginResponse.data)); //  Gửi action để cập nhật thông tin người dùng.
					message.success('Đăng nhập thành công với mật khẩu mới');
				} else {
					message.error('Có lỗi khi đăng nhập lại với mật khẩu mới');
				}
			} else {
				// Mật khẩu cũ không đúng
				setOldPasswordValid(false);
				message.error('Mật khẩu cũ không đúng!');
			}
		} catch (error) {
			message.error('Có lỗi xảy ra khi cập nhật mật khẩu');
		}
	};
	
	

    return (
        <div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
            <div className="grid grid-cols-5 gap-6">
                {/* Sidebar */}
                <AuthSidebar />
                
                {/* Password Change Form */}
                <div className="grid col-span-4 p-6 bg-white shadow-md">
                    <p className="text-3xl text-center">Đổi Mật Khẩu</p>
                    <Form
                        size="large"
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {/* Old Password */}
                        <Form.Item
                            name="oldPassword"
                            label="Mật khẩu cũ"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {!oldPasswordValid && (
                            <p className="text-red-500">Mật khẩu cũ không đúng!</p>
                        )}

                        {/* New Password */}
                        <Form.Item
                            name="newPassword"
                            label="Mật khẩu mới"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* Confirm New Password */}
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu mới"
                            rules={[ // Đây là mảng các quy tắc xác thực cho trường nhập liệu này. Các quy tắc này sẽ được áp dụng để kiểm tra giá trị người dùng nhập vào.
                                { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }, // Quy tắc này yêu cầu trường này phải được điền. Nếu trường không có giá trị, thông báo "Vui lòng xác nhận mật khẩu mới!" sẽ được hiển thị.
                                ({ getFieldValue }) => ({ // Đây là một hàm xác thực tùy chỉnh. Nó nhận getFieldValue, một hàm cho phép bạn lấy giá trị của các trường khác trong form.
                                    validator(_, value) { // Tham số này thường không được sử dụng nên được đặt tên là _ (để tránh cảnh báo
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve(); // Nếu không có giá trị nào nhập vào (!value), hoặc giá trị nhập vào khớp với giá trị của trường "Mật khẩu mới" (getFieldValue('newPassword') === value), thì hàm trả về Promise.resolve(), có nghĩa là trường xác nhận mật khẩu hợp lệ.
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!')); // Nếu hai giá trị không khớp, hàm sẽ trả về Promise.reject(), báo rằng xác nhận mật khẩu không hợp lệ với thông báo lỗi "Mật khẩu không khớp!".
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* Submit Button */}
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
        </div>
    );
}
