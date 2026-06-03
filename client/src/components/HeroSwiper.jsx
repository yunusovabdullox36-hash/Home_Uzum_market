import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Mega Yozgi Chegirmalar",
    subtitle: "50% gacha chegirmalar",
    description: "Eng sara mahsulotlarni arzon narxlarda xarid qiling",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
    button: "Xarid qilish",
  },
  {
    id: 2,
    title: "Yangi Smartfonlar",
    subtitle: "Premium kolleksiya",
    description: "So'nggi texnologiyalar endi siz uchun",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    button: "Ko'rish",
  },
  {
    id: 3,
    title: "Moda va Stil",
    subtitle: "Yangi mavsum",
    description: "Trenddagi kiyimlar va aksessuarlar",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    button: "Boshlash",
  },
];

const HeroSwiper = () => {
  return (
    <div className="hero-swiper max-w-[1250px] mx-auto px-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="overlay">
                <div className="content">
                  <span>{slide.subtitle}</span>

                  <h1>{slide.title}</h1>

                  <p>{slide.description}</p>

                  <button>{slide.button}</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-swiper {
          width: 100%;
          margin-top: 20px;
        }

        .hero-slide {
          height: 420px;
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          overflow: hidden;
        }

        .overlay {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.8),
            rgba(0,0,0,0.3),
            transparent
          );

          display: flex;
          align-items: center;
          padding: 60px;
        }

        .content {
          max-width: 500px;
          color: white;
        }

        .content span {
          display: inline-block;
          background: #7c3aed;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .content h1 {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 15px;
        }

        .content p {
          font-size: 18px;
          color: #e5e7eb;
          margin-bottom: 25px;
        }

        .content button {
          border: none;
          background: #7c3aed;
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: .3s;
        }

        .content button:hover {
          transform: translateY(-2px);
          background: #6d28d9;
        }



        .swiper-pagination-bullet {
          background: white;
          opacity: .6;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero-slide {
            height: 300px;
          }

          .overlay {
            padding: 30px;
          }

          .content h1 {
            font-size: 32px;
          }

          .content p {
            font-size: 14px;
          }

          .content button {
            padding: 12px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSwiper;