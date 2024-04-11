import React from 'react';


const About = () => {
    return (
        <div className="w-[50%] mx-auto">
            <h1 className='text-center text-2xl mt-10'>FAQ</h1>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>How do I place an order?</h3>
                <p className='text-start text-lg mt-10'>Select the product you wish to purchase.
                    Select the desired size and click ADD TO CART. Continue shopping if you wish to purchase
                    more items. When finished shopping, double check your cart information (i.e. size, quantity, address)
                    and click CHECKOUT. Follow the instructions for payment and delivery.</p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>What forms of payment do you accept?</h3>
                <p className='text-start text-lg mt-10'>We accept all major credit/debit cards.</p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Do you ship worldwide?</h3>
                <p className='text-start text-lg mt-10'>Yes, all countries can be shipped. But due to COVID-19, shipping is being delayed and limited to some countries.

                    Asia:
                    Macao, China, Lao People's Dem Rep, Bangladesh, Malaysia, Vietnam, Brunei, Singapore, Japan, Darussalam, Cambodia, Thailand, Maldives, Mongolia, Bahrain, Bhutan, United Arab Emirates, India, Indonesia, Philippines, Oman, Jordan, Israel, Qatar, Kuwait, Pakistan, Nepal, East Timor, Lebanon, Bangladesh, Saudi Arabia, Sri Lanka, Afghanistan, Uzbekistan, Iraq, Kazakhstan, Kyrgyzstan, Tajikistan, Taiwan, Hongkong, Republic of Korea

                    Europe:
                    Albania, Armeni, Austria, Azerbaijan, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Georgia, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Lithuania, Luxemburg, Macedonia, Malta, Moldova, Monaco, Netherlands, Norway, Poland, Portugal, Republic of Montenegro, Romania, Russia, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, United Kingdom, Vatican City

                    North America:
                    Canada, Greenland, United States
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>How much is international shipping?</h3>
                <p className='text-start text-lg mt-10'>
                    This varies on the destination and shipping kind (regular/express). You can view the shipping and handling fee after CHECKOUT and before submitting your payment.

                    BUT customers in some countries may need to pay extra tariffs. If customers refuse to pay tariff and wish for a refund, please note that 'Shipping Fee' will not be refunded.</p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>How long will it take for my order to arrive?</h3>
                <p className='text-start text-lg mt-10'>
                    Please allow 1-2 days of handling in addition to shipping time estimate. For all orders in the USA, we estimate the delivery time to be 3-5 business days. International orders can take 14-21 business days depending on the country.
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>Do you accept returns and/or exchanges?</h3>
                <p className='text-start text-lg mt-10'>
                Yes, please view the Returns & Exchange Policy link.
                </p>
            </div>
            <div>
                <h3 className='text-start text-xl font-semibold mt-10'>How do I wash the clothes?</h3>
                <p className='text-start text-lg mt-10'>
                A general rule that is safe to follow for all of our apparel is to flip the clothes inside out and machine wash cold. Tumble dry low or hang dry.
                </p>
            </div>
        </div>
    );
};

export default About;