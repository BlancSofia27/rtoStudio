import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2"; // Asegúrate de tener instalado SweetAlert2
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Lista de servicios con prices
const servicios = [
  { name: 'SoftGel', category: 'Estética', price: 25, time: 40,  },
  { name: 'Semipermanente', category: 'Estética', price: 30, time: 50, },
  { name: 'Kapping', category: 'Estética', price: 20, time: 30,},
  { name: 'Remoción Semipermanente', category: 'Remoción', price: 15, time: 25, },
  { name: 'Remoción Kapping', category: 'Remoción', price: 18, time: 28,  },
  { name: 'Promo Deco Simple', category: 'Promos', price: 22, time: 35,},
  { name: 'Promo Tintura', category: 'Promos', price: 28, time: 45, },
];

// Horarios disponibles
const horariosDisponibles = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "13:10",
  "16:00",
  "16:20",
  "17:00",
  "17:10",
  "18:00",
  "19:00",
  "19:15",
  "20:00",
  "20:30",
];

const ServiciosTable = () => {
  const [horariosActivos, setHorariosActivos] = useState(horariosDisponibles); // Inicialmente, todos los horarios están activos
  const [nuevoHorario, setNuevoHorario] = useState({ hora: "", minuto: "" }); // Para el formato de dos dígitos
  const navigate = useNavigate();

  // Función para manejar el clic en un horario
  const handleHorarioClick = (horario) => {
    if (horariosActivos.includes(horario)) {
      Swal.fire({
        title: "¿Desactivar este horario?",
        text: `¿Quieres desactivar el horario de ${horario}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", // Color rojo para eliminar
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setHorariosActivos((prev) => prev.filter((h) => h !== horario)); // Desactiva el horario
          Swal.fire({
            title: "Desactivado",
            text: `El horario de ${horario} ha sido desactivado.`,
            icon: "success",
            timer: 2000, // Cierre automático después de 2 segundos
            showConfirmButton: false,
          });
        }
      });
    }
  };

  // Función para agregar un nuevo horario
  const agregarHorario = () => {
    const nuevoHorarioCompleto = `${nuevoHorario.hora.padStart(2, "0")}:${nuevoHorario.minuto.padStart(2, "0")}`;
    if (nuevoHorarioCompleto && !horariosActivos.includes(nuevoHorarioCompleto)) {
      setHorariosActivos((prev) => [...prev, nuevoHorarioCompleto]); // Agrega el nuevo horario
      Swal.fire({
        title: "Nuevo horario agregado",
        text: `Se ha agregado el horario: ${nuevoHorarioCompleto}`,
        icon: "success",
        timer: 2000, // Cierre automático después de 2 segundos
        showConfirmButton: false,
      });
      setNuevoHorario({ hora: "", minuto: "" }); // Reinicia los campos de horario
    } else {
      Swal.fire("Error", "El horario ya está activo o no es válido.", "error");
    }
  };

  // Manejar cambios en los campos de hora y minuto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hora" && value.length <= 2 && !isNaN(value)) {
      setNuevoHorario((prev) => ({ ...prev, hora: value }));
    }
    if (name === "minuto" && value.length <= 2 && !isNaN(value)) {
      setNuevoHorario((prev) => ({ ...prev, minuto: value }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">prices Vigentes</h1>

      {/* Swiper para servicios */}
      <Swiper spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }} loop={true} className="mySwiper w-full">
        {servicios.map((servicio, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-200 border border-gray-700 rounded-lg mb-4 p-4 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-white mb-2">{servicio.name}</h2>
              <p className="text-gray-300 text-lg">price: {servicio.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Sección de horarios */}
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-xl font-semibold text-white mr-4">Horarios Activos</h2>

        {/* Formulario para agregar nuevo horario */}
        <div className="flex space-x-2">
          <input
            type="text"
            name="hora"
            value={nuevoHorario.hora}
            onChange={handleInputChange}
            placeholder="HH"
            className="w-12 p-2 rounded text-center text-black"
            maxLength={2}
          />
          <span className="text-white">:</span>
          <input
            type="text"
            name="minuto"
            value={nuevoHorario.minuto}
            onChange={handleInputChange}
            placeholder="MM"
            className="w-12 p-2 rounded text-center text-black"
            maxLength={2}
          />
          <button
            onClick={agregarHorario}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        {horariosDisponibles.map((horario) => (
          <button
            key={horario}
            onClick={() => handleHorarioClick(horario)}
            className={`p-3 rounded-lg font-bold ${
              horariosActivos.includes(horario) ? "bg-green-500 text-white" : "bg-gray-600 text-gray-200"
            } transition duration-200`}
          >
            {horario}
          </button>
        ))}
      </div>

      {/* Sección de horarios inactivos */}
      <h3 className="text-lg font-semibold text-white text-center mt-6">Horarios Inactivos</h3>
      <div className="grid grid-cols-4 gap-4 w-full mt-2">
        {horariosDisponibles
          .filter((horario) => !horariosActivos.includes(horario))
          .map((horario) => (
            <button
              key={horario}
              onClick={() => agregarHorario(horario)}
              className="py-2 px-4 rounded-lg font-semibold bg-blue-600 text-white transition duration-200 hover:bg-blue-700"
            >
              {horario}
            </button>
          ))}
      </div>

      
    </div>
  );
};

export default ServiciosTable;
