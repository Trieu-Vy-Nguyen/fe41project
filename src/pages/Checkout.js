import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, setBillDetails } from '../store/redux/CartSlice';
import { Button, Form, Input, message, Radio } from 'antd';
import { ServiceApi } from '../services/Api';
import { ORDER_STATUS } from '../constants';
import { useNavigate } from 'react-router-dom';
import Price from '../components/Price';
import { setShowAuthModal } from '../store/redux/AuthSlice';
import { sentOrderSuccessEmail } from '../services/Email';
import { ROUTERS } from '../constants/Routers';

export default function Checkout() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const carts = useSelector((state) => state.cart.carts); 
  const user = useSelector((state) => state.auth.user); 
  const billDetails = useSelector((state) => state.cart.billDetails); 
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const calculateTotal = () => {
    return carts.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  const totalPrice = calculateTotal();

  const onFinish = async (values) => {
    if (!user) {
      dispatch(setShowAuthModal(true));
      return;
    }

    setIsSubmitting(true);
    try {
      if (paymentMethod === 'card') {
        navigate(ROUTERS.CARDPAYMENT, { state: { ...values, totalPrice } });
        return;
      }

      const resOrder = await ServiceApi.createOrder({
        ...values,
        userId: user.id,
        status: ORDER_STATUS.PENDING,
        orderDate: new Date().toISOString(),
        price: totalPrice,
      });

      if (resOrder.ok) {
        dispatch(setBillDetails(values));
        await Promise.all(
          carts.map(async (cart) => {
            await ServiceApi.createOrderDetails({
              orderId: resOrder.data.id,
              product: cart,
              quantity: cart.quantity,
              price: cart.price,
            });
          })
        );

        sentOrderSuccessEmail({
          email: user.email,
          userName: `${user.firstname} ${user.lastname}`,
          orderDate: resOrder.data.orderDate,
          orderCode: resOrder.data.id,
          orderPrice: `$ ${resOrder.data.price}`,
        });

        message.success('Đặt hàng thành công !!');
        dispatch(resetCart());
        navigate(ROUTERS.SUCCESS);
      } else {
        message.error('Đặt hàng không thành công');
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
      <Form
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        form={form}
        initialValues={{
          ...billDetails,
        }}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-3 gap-6">
          <div className="grid col-span-2 p-6 bg-white shadow-md">
            <div className="pb-8">
              <p className="text-3xl">Thông Tin Đặt Hàng</p>
            </div>
            <Form.Item
              name="fullName"
              label="Họ và Tên"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="city"
              label="Thành Phố / Tỉnh"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập Tỉnh/Thành" />
            </Form.Item>
            <Form.Item
              name="country"
              label="Quận / Huyện"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập Quận/Huyện" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid col-span-1 p-6 bg-white shadow-md">
            <div className="flex flex-col justify-between h-full">
              <div className="divide-y divide-[#e9e9e9]">
                <div className="py-5">
                  <p className="font-semibold">Tất cả về giỏ hàng</p>
                </div>
                <div className="flex flex-row items-center justify-between py-6">
                  <p className="font-semibold">Tổng tiền sản phẩm :</p>
                  <p className="font-semibold">
                    <Price value={totalPrice} />
                  </p>
                </div>
                <div className="py-5 space-y-4">
                  <div className="flex flex-row items-center justify-between">
                    <p className="font-semibold">Phụ thu:</p>
                    <p>$0</p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between py-5">
                  <p className="font-semibold">Tổng số tiền phải thanh toán :</p>
                  <p className="font-semibold">
                    <Price value={totalPrice} />
                  </p>
                </div>
              </div>
              <div className="font-semibold">Phương thức thanh toán :</div>
              <Form.Item
                name="paymentMethod"
                initialValue="cod"
                rules={[{ required: true }]}
              >
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                  <Radio value="card">Thanh toán qua QR Code</Radio>
                </Radio.Group>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full mt-5"
              >
                Xác nhận đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
