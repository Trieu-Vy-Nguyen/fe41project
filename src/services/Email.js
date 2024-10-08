import emailjs from '@emailjs/browser';

export const sentOrderSuccessEmail = async ({ email, name }) => {
    try {
        const serviceId = 'service_xnl1yug';
        const templateId = 'template_scw7i8m';
        const publicKey = 'FvWHXascOz1UHEdje';

        const templateParams = {
			from_name: 'NghienBongDa',
			from_email: email,
			to_name: name,
			message: 'Cảm ơn bạn đã đặt hàng ! Chúng tôi sẽ liên hệ với bạn trong khoản thời gian sớm nhất để có thể giao hàng ! Chúc bạn nhiều may mắn trong thời gian sắp tới ! Trân Trọng.',
		};

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey); // Gọi phương thức send của EmailJS để gửi email. Hàm này trả về một promise và chúng ta sử dụng await để chờ kết quả.
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
