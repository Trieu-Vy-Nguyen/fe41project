import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="w-full h-[330px] bg-black mt-10">
            <div className="flex justify-between" >
                <div className="flex flex-col flex-1 mt-10 ml-7">
                    <p className="text-white font-weight-400">Copyright &copy; 2023, T1 Shop All right reserved 2023</p>
                    <div className="flex flex-row gap-10 mt-5 text-white">
                        <a className="hover:text-blue-600" target="newblank" href="https://www.facebook.com/t1.esports.gg"><FaFacebookF /></a>
                        <a className="hover:text-blue-600" target="newblank" href="https://twitter.com/T1"><FaTwitter /></a>
                        <a className="hover:text-blue-600" target="newblank" href="https://www.instagram.com/t1shopna/"><FaInstagram /></a>
                        <a className="hover:text-blue-600" target="newblank" href="https://www.youtube.com/sktt1"><FaYoutube /></a>
                        <a className="hover:text-blue-600" target="newblank" href="https://www.tiktok.com/@t1"><FaTiktok /></a>
                    </div>
                </div>
                <div className="flex flex-col flex-1 mt-10 gap-5">
                    <p className="text-white font-semibold text-lg ">LINKS</p>
                    <p className=" text-white">TERMS OF SERVICE</p>
                    <p className=" text-white">PRIVACY POLICY</p>
                </div>
                <div className="flex flex-col flex-1 mt-10 gap-5">
                    <p className="text-white font-semibold">INFORMATION</p>
                    <p className=" text-white">FAQ</p>
                    <p className=" text-white">RETURN & EXCHANGES</p>
                    <p className=" text-white">CONTACT</p>
                </div>
            </div>
            <div className=" ml-7 flex flex-col gap-4 mt-8">
                <a className=" text-white" href="#">&copy; T1 Shop</a>
                <a className=" text-white" target="newblank" href="https://www.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore">Powered by Shopify</a>

            </div>
        </div>
    );
}