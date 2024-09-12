import { useState, useEffect } from 'react';

const images = [
  'https://theme.hstatic.net/200000580329/1000937158/14/slide_1_img.jpg?v=96',
  'https://theme.hstatic.net/200000580329/1000937158/14/slide_2_img.jpg?v=96',
  'https://theme.hstatic.net/200000580329/1000937158/14/slide_3_img.jpg?v=96',
  'https://theme.hstatic.net/200000580329/1000937158/14/slide_4_img.jpg?v=96',
];

export default function BannerSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className=" overflow-hidden">
      <img
        src={images[currentImage]}
        alt="Banner"
        className=" object-cover transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
}
