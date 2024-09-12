import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../store/redux/CartSlice';
import { ServiceApi } from '../services/Api';
import { sentOrderSuccessEmail } from '../services/Email';
import { ORDER_STATUS, ROUTERS } from '../constants/Routers';
import { useState } from 'react';

export default function CardPayment() {
  const location = useLocation(); // Get the state passed from Checkout page
  const navigate = useNavigate();
  const [showQrCode, setShowQrCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const user = useSelector((state) => state.auth.user);

  const { fullName, address, city, country, phone, email, totalPrice } = location.state || {}; // Destructure form data

  const handlePayment = async () => {
    if (!user) {
      message.error("Vui lòng đăng nhập để thanh toán");
      return;
    }

    setIsSubmitting(true);
    try {
      const resOrder = await ServiceApi.createOrder({
        fullName,
        address,
        city,
        country,
        phone,
        email,
        userId: user.id,
        status: ORDER_STATUS.PENDING,
        orderDate: new Date().toISOString(),
        price: totalPrice,
      });

      if (resOrder.ok) {
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
          orderPrice: `$${resOrder.data.price}`,
        });

        message.success('Đặt hàng thành công !!');
        dispatch(resetCart());
        navigate(ROUTERS.HOME);
      } else {
        message.error('Đặt hàng không thành công !!');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thanh toán');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-20 mx-auto min-h-[calc(100vh_-_139px)]">
      <div className="p-6 bg-white shadow-md text-center text-2xl mb-6">
        Thanh Toán Bằng Thẻ Ngân Hàng
      </div>
      <div className="text-center">
        {!showQrCode && (
          <Button type="primary" onClick={() => setShowQrCode(true)}>
            Tạo mã thanh toán
          </Button>
        )}
      </div>
      {showQrCode && (
        <div className="mt-10 flex flex-col items-center">
          <img src="/images/qr-code.png" alt="QR Code" />
          <p className="text-lg py-3">Vui lòng thanh toán số tiền trùng khớp với sản phẩm bạn đã đặt !!!</p>
          <p className="text-lg font-bold">Nội dung giao dịch: NGHIENBONGDA - ORDER TO PAYMENT</p>
          <Button
            type="primary"
            className="mt-5"
            loading={isSubmitting}
            onClick={handlePayment}
          >
            Thanh toán
          </Button>
        </div>
      )}
    </div>
  );
}
