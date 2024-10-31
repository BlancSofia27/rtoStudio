import React from 'react';
import { Calendar, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import locale from 'antd/es/locale/es_ES';
import "./adminCalendar.css" // Asegúrate de que este archivo CSS esté importado.

dayjs.locale('es'); // Configura dayjs en español

const AdminCalendar = ({ reservas, onDateChange, selectedDate }) => {
  // Función para renderizar los turnos en las celdas del calendario
  const dateCellRender = (date) => {
    // Verifica si el día es domingo
    if (date.day() === 0) return null; // No renderiza nada si es domingo

    const formattedDate = date.format('YYYY-MM-DD');
    const dailyReservas = reservas.filter((reserva) => reserva.fecha === formattedDate);

    return (
      <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
        {dailyReservas.map((reserva, index) => (
          <li key={index} className="reservation-item bg-gray-300 my-1 border-l-2 border-pink pl-2">
            <strong>{reserva.horario}</strong>-{reserva.servicio}
            <span className="name-hover">{reserva.nombre}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ConfigProvider locale={locale}>
      <Calendar
        fullscreen
        value={dayjs(selectedDate)}
        onSelect={(date) => onDateChange(date.toDate())}
        dateCellRender={dateCellRender}
      />
    </ConfigProvider>
  );
};

export default AdminCalendar;
