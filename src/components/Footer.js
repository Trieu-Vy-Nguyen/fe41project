import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <div>
                <img src='https://theme.hstatic.net/200000580329/1000937158/14/gallery_item_1_img.jpg?v=96'/>
               
            </div>
            <div className="container flex items-center justify-between h-full mx-auto max-w-[1200px] mt-10 py-20">
                
                <div className="">
                    <div className="flex flex-row gap-10">
                        <a className="hover:text-green-600" target="_blank" href="https://www.facebook.com/nghienbongda98">
                            <FaFacebookF />
                        </a>
                        <a className="hover:text-blue-600" target="_blank" href="https://www.instagram.com/nghienbongda.vn/">
                            <FaInstagram />
                        </a>
                        <a className="hover:text-blue-600" target="_blank" href="https://www.youtube.com/@Boongminz98">
                            <FaYoutube />
                        </a>
                        <a className="hover:text-blue-600" target="_blank" href="https://nghienbongda.vn/">
                            <FaTiktok />
                        </a>
                    </div>
                </div>

                <div className=" flex flex-col gap-5 ml-10">
                    <p className="text-black font-semibold text-2xl text-center">Về Nghiện Bóng Đá</p>
                    <p className="text-black text-sm">
                        Chúng tôi được tạo ra với mục đích mang lại thật nhiều điều tích cực cho cộng đồng những người yêu bóng đá trên toàn đất nước Việt Nam.
                        Với chất lượng sản phẩm cùng dịch vụ chăm sóc khách hàng kỹ lưỡng, tỉ mỉ, Nghiện Bóng Đá hi vọng sẽ là một địa chỉ đáng tin cậy dành cho tất cả các anh em yêu bóng đá.
                        Cùng nhau cháy hết mình với môn thể thao Vua, đó chính là những gì chúng tôi muốn truyền tải đến các khách hàng. Cảm ơn!
                    </p>
                </div>

               
            </div>
        </>
    );
}
