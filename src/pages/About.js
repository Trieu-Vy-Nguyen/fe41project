import React from 'react';

const About = () => {
    return (
        <div className="w-[50%] mx-auto">
            <h1 className='text-center text-2xl mt-10'>CÂU HỎI THƯỜNG GẶP</h1>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Làm thế nào để đặt hàng?</h3>
                <p className='text-start text-lg mt-10'>Chọn sản phẩm bạn muốn mua. 
                    Chọn kích thước mong muốn và nhấn THÊM VÀO GIỎ HÀNG. Tiếp tục mua sắm nếu bạn muốn mua thêm sản phẩm. 
                    Khi đã hoàn thành việc mua sắm, kiểm tra kỹ lại thông tin giỏ hàng của bạn (ví dụ: kích thước, số lượng, địa chỉ) và nhấn THANH TOÁN. 
                    Làm theo hướng dẫn để thanh toán và giao hàng.</p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Bạn chấp nhận những hình thức thanh toán nào?</h3>
                <p className='text-start text-lg mt-10'>Chúng tôi chấp nhận tất cả các thẻ tín dụng/thẻ ghi nợ chính.</p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Bạn có giao hàng toàn cầu không?</h3>
                <p className='text-start text-lg mt-10'>Có, chúng tôi giao hàng tới tất cả các quốc gia. Tuy nhiên, do tình hình COVID-19, việc vận chuyển đang bị trì hoãn và hạn chế đối với một số quốc gia.

                    Châu Á:
                    Macao, Trung Quốc, Cộng hòa Dân chủ Nhân dân Lào, Bangladesh, Malaysia, Việt Nam, Brunei, Singapore, Nhật Bản, Darussalam, Campuchia, Thái Lan, Maldives, Mông Cổ, Bahrain, Bhutan, Các Tiểu vương quốc Ả Rập Thống nhất, Ấn Độ, Indonesia, Philippines, Oman, Jordan, Israel, Qatar, Kuwait, Pakistan, Nepal, Đông Timor, Lebanon, Bangladesh, Ả Rập Saudi, Sri Lanka, Afghanistan, Uzbekistan, Iraq, Kazakhstan, Kyrgyzstan, Tajikistan, Đài Loan, Hongkong, Hàn Quốc

                    Châu Âu:
                    Albania, Armenia, Áo, Azerbaijan, Belarus, Bỉ, Bosnia và Herzegovina, Bulgaria, Croatia, Síp, Cộng hòa Séc, Đan Mạch, Estonia, Phần Lan, Pháp, Georgia, Đức, Hy Lạp, Hungary, Iceland, Ireland, Ý, Latvia, Lithuania, Luxemburg, Macedonia, Malta, Moldova, Monaco, Hà Lan, Na Uy, Ba Lan, Bồ Đào Nha, Cộng hòa Montenegro, Romania, Nga, San Marino, Serbia, Slovakia, Slovenia, Tây Ban Nha, Thụy Điển, Thụy Sĩ, Vương quốc Anh, Thành Vatican

                    Bắc Mỹ:
                    Canada, Greenland, Hoa Kỳ
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Chi phí vận chuyển quốc tế là bao nhiêu?</h3>
                <p className='text-start text-lg mt-10'>
                    Chi phí này phụ thuộc vào điểm đến và loại hình vận chuyển (thường/nhanh). Bạn có thể xem phí vận chuyển và xử lý sau khi chọn THANH TOÁN và trước khi hoàn tất thanh toán.

                    Tuy nhiên, khách hàng ở một số quốc gia có thể phải trả thêm thuế nhập khẩu. Nếu khách hàng từ chối trả thuế nhập khẩu và muốn hoàn tiền, xin lưu ý rằng "Phí vận chuyển" sẽ không được hoàn lại.
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Đơn hàng của tôi sẽ mất bao lâu để đến nơi?</h3>
                <p className='text-start text-lg mt-10'>
                    Vui lòng đợi 1-2 ngày để xử lý đơn hàng trước khi tính thời gian vận chuyển. Đối với tất cả đơn hàng tại Hoa Kỳ, thời gian giao hàng ước tính là 3-5 ngày làm việc. Đơn hàng quốc tế có thể mất từ 14-21 ngày làm việc tùy thuộc vào quốc gia.
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Bạn có chấp nhận trả hàng và/hoặc đổi hàng không?</h3>
                <p className='text-start text-lg mt-10'>
                Có, vui lòng xem liên kết Chính sách Đổi Trả.
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Tôi nên giặt quần áo như thế nào?</h3>
                <p className='text-start text-lg mt-10'>
                Quy tắc chung an toàn cho tất cả các loại quần áo của chúng tôi là lộn ngược quần áo và giặt máy bằng nước lạnh. Sấy khô ở nhiệt độ thấp hoặc phơi khô.
                </p>
            </div>
        </div>
    );
};

export default About;
