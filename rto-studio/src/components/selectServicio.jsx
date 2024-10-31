import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectService } from '../redux/servicesSlice';
import Slider from 'react-slick';
import unas1 from "../assets/unas1.mp4";
import unas2 from "../assets/unas2.mp4";
import unas from "../assets/unas.mp4";
import semi from "../assets/semi.mp4";
import cejas from "../assets/cejas.mp4";
import clock from "../assets/clock.svg";
// Importar los estilos de slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = ['Estética', 'Promos', 'Remoción'];

const services = [
  { id: 1, name: 'SoftGel', category: 'Estética', price: 25, time: 40, video: unas1 },
  { id: 2, name: 'Semipermanente', category: 'Estética', price: 30, time: 50, video: semi },
  { id: 3, name: 'Kapping', category: 'Estética', price: 20, time: 30, video: unas2 },
  { id: 8, name: 'Remoción Semipermanente', category: 'Remoción', price: 15, time: 25, video: unas },
  { id: 9, name: 'Remoción Kapping', category: 'Remoción', price: 18, time: 28, video: cejas },
  { id: 12, name: 'Promo Deco Simple', category: 'Promos', price: 22, time: 35, video: unas1 },
  { id: 13, name: 'Promo Tintura', category: 'Promos', price: 28, time: 45, video: semi },
];


const SelectServicio = () => {
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.services.selectedService);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sliderRef, setSliderRef] = useState(null); // Referencia para el slider

  const handleServiceClick = (service) => {
    dispatch(selectService(service));
  };

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveCategory(categories[next]), // Actualiza la categoría activa al cambiar de sección
    responsive: [
      {
        breakpoint: 768, // Pantallas pequeñas
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Pantallas medianas
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  // Actualizar el carrusel cuando cambie la categoría activa
  useEffect(() => {
    const index = categories.indexOf(activeCategory);
    if (sliderRef && index >= 0) {
      sliderRef.slickGoTo(index); // Mueve el carrusel a la sección correspondiente
    }
  }, [activeCategory, sliderRef]);

  return (
    <div className="container mx-auto text-black p-3">
      <h2 className="text-2xl text-pink font-bold mb-6">Servicios</h2>

      {/* Pestañas de selección */}
      <div className="flex space-x-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 ${activeCategory === category ? 'border-x-2 border-pink text-pink' : 'border-x-2 text-neutral-800'}`}
            onClick={() => {
              setActiveCategory(category);
              sliderRef.slickGoTo(index); // Desplaza el carrusel a la sección correspondiente
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Carrusel animado */}
      <Slider {...settings} ref={setSliderRef}>
        {categories.map((category) => (
          <div key={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <div
                    key={service.id}
                    className={`border rounded-lg h-36 flex items-center space-x-4 cursor-pointer shadow-md ${
                      selectedService === service.name ? 'border-blue-500' : ''
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    {/* <video src={service.video} className="w-36 h-full rounded-l-lg object-cover mr-4" autoPlay loop muted /> */}
                    <div className='p-2'>
                      <h3 className="text-lg font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600">${service.price}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <img className="mr-2" src={clock} alt="" />
                       {service.time} min</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SelectServicio;
