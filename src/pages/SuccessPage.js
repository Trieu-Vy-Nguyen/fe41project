
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-20 mx-auto min-h-[calc(100vh_-_139px)]">
      <div className="p-6 bg-white shadow-md text-center">
        <h1 className="text-3xl font-semibold">Bạn đã đặt hàng thành công !!!</h1>
        <p className="text-lg mt-4">Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi , hi vọng trong thời gian sắp tới bạn vẫn đồng hành cùng Shop , cảm ơn bạn rất nhiều !!! </p>
        <div className="mt-8 space-x-4">
          <Button
            type="primary"
            onClick={() => navigate(ROUTERS.HOME)}
          >
            Về Trang Chủ
          </Button>
          <Button
            type="default"
            onClick={() => navigate(ROUTERS.PRODUCTS)}
          >
            Tiếp Tục Mua Sắm
          </Button>
        </div>
      </div>
    </div>
  );
}
