import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../redux/servicesSlice';
import './calendar.css';
import { es } from 'date-fns/locale';

const SelectCalendar = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.services);
  
  // Registra la localización en español y la establece como predeterminada
  registerLocale('es', es);
  
  // Cambia el estado inicial a null para no tener una fecha seleccionada por defecto
  const [startDate, setStartDate] = useState(null); 

  useEffect(() => {
    if (date) {
      const parsedDate = new Date(date);
      // Verifica si la fecha es válida antes de establecer el estado
      if (!isNaN(parsedDate.getTime())) {
        setStartDate(parsedDate);
      }
    }
  }, [date]);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = formatearFecha(date);
      setStartDate(date); // Actualiza `startDate` localmente
      dispatch(selectDate(formattedDate)); // Actualiza en Redux
    } else {
      setStartDate(null); // Si se deselecciona, establece `startDate` a null
      dispatch(selectDate(null)); // Opcional: actualiza el estado en Redux para indicar que no hay fecha seleccionada
    }
  };

  const formatearFecha = (date) => {
    const fecha = new Date(date);
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  // Define los días permitidos (de lunes a sábado)
  const allowedDays = [1, 2, 3, 4, 5, 6]; // 0 = domingo, 1 = lunes, ..., 6 = sábado

  // Función para habilitar solo los días permitidos y no anteriores al día actual
  const filterDays = (date) => {
    const day = date.getDay();
    const today = new Date();
    // Verifica si la fecha es hoy o en el futuro
    const isTodayOrFutureDate = date >= today.setHours(0, 0, 0, 0); // Permitir solo fechas de hoy en adelante (sin horas)

    return allowedDays.includes(day) && isTodayOrFutureDate; // Habilita solo los días permitidos
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h3 className="text-black mb-4">Selecciona una Fecha</h3>
      <DatePicker
        selected={startDate} // `startDate` puede ser null
        onChange={handleDateChange}
        filterDate={filterDays} // Aplica el filtro de días
        inline
        className="border p-2 rounded bg-white text-black"
        placeholderText="Selecciona una fecha" // Opcional: texto de marcador de posición
        locale="es" // Establece la localización en español
      />
    </div>
  );
};

export default SelectCalendar;
