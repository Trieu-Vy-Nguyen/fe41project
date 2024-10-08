import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-16">
            <h1 className='text-4xl font-bold text-center mb-10'>LIÊN HỆ</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">ĐỊA CHỈ</h2>
                    <p className="text-lg mb-6">
                        Hệ thống In Ấn | Đặt Áo Đội tại Nghienbongda.vn
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Văn phòng:</strong> Tòa nhà Thăng Long, 98 Láng Hạ, Đống Đa, Hà Nội
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Email:</strong> <a href="mailto:support@nghienbongda.vn" className="text-blue-500 underline">support@nghienbongda.vn</a>
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Số điện thoại:</strong> (+84) 24 6253 9595
                    </p>
                </div>

                {/* Right Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">THỜI GIAN HOẠT ĐỘNG</h2>
                    <p className="text-lg mb-6">
                        <strong>Thứ 2 - Thứ 6:</strong> 9:30 AM - 5:30 PM
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Thứ 7:</strong> 9:30 AM - 12:00 PM
                    </p>
                    <p className="text-lg mb-6">
                        Vui lòng gửi email hoặc gọi vào số hotline để được hỗ trợ nhanh nhất.
                    </p>
                </div>
            </div>
            <img src='https://file.hstatic.net/200000580329/file/nmd11821_a760cd576d454cf3b29758e03518afa7_grande.jpg'/>
            {/* Additional Info */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">CHÍNH SÁCH BẢO HÀNH</h2>
                <p className="text-lg mb-6">
                    Chính sách bảo hành sản phẩm được đăng tải chi tiết trên trang "Chính sách bảo hành". Vui lòng truy cập trang này để biết thêm thông tin.
                </p>
                
            </div>
        </div>
    );
};

export default Contact;
