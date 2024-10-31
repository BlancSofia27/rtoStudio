import { useState } from 'react';
import AdminCalendar from './calendarAdmin'; // Asegúrate de que la ruta sea correcta

const AdminReservasTable = () => {
  const [fecha, setFecha] = useState(new Date());
  const [search, setSearch] = useState('');
  const [servicio, setServicio] = useState('');

  const randomServicio = () => {
    const servicios = ['Corte', 'Barba', 'Color'];
    return servicios[Math.floor(Math.random() * servicios.length)];
  };

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '13:10', '16:00', '16:20', '17:00', '17:10', '18:00', '19:00',
    '19:15', '20:00', '20:30'
  ];

  const reservasHardcoded = [
    { id: 1, nombre: 'Juan Ramírez', servicio:'Kapping' , horario: horarios[0], fecha: '2024-11-01' },
    { id: 2, nombre: 'Carlos Ortiz', servicio:'SoftGel' , horario: horarios[1], fecha: '2024-11-01' },
    { id: 3, nombre: 'Miguel Pérez', servicio:"Laminado + Perfilado" , horario: horarios[2], fecha: '2024-11-02' },
    { id: 4, nombre: 'Luis Martínez', servicio:'SoftGel' , horario: horarios[3], fecha: '2024-11-02' },
    { id: 5, nombre: 'José Rodríguez', servicio:'Kapping' , horario: horarios[4], fecha: '2024-11-03' },
    { id: 6, nombre: 'David Fernández', servicio:'Semipermanente' , horario: horarios[5], fecha: '2024-11-03' },
    { id: 7, nombre: 'Santiago Sánchez', servicio:'SoftGel' , horario: horarios[6], fecha: '2024-11-04' },
    { id: 8, nombre: 'Diego Olivero', servicio:"Laminado + Perfilado" , horario: horarios[7], fecha: '2024-11-04' },
    { id: 9, nombre: 'Pablo Torres', servicio: 'Kapping', horario: horarios[8], fecha: '2024-11-05' },
    { id: 10, nombre: 'Andrés Gómez', servicio:'SoftGel' , horario: horarios[9], fecha: '2024-11-05' },
    { id: 11, nombre: 'Sebastián Domínguez', servicio:'Semipermanente' , horario: horarios[10], fecha: '2024-11-06' },
    { id: 12, nombre: 'Valentín López', servicio:'SoftGel' , horario: horarios[11], fecha: '2024-11-06' },
    { id: 13, nombre: 'Daniel Suárez', servicio:'Semipermanente' , horario: horarios[12], fecha: '2024-11-07' },
  ];

  const filteredReservas = reservasHardcoded
    .filter((reserva) => reserva.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter((reserva) => servicio ? reserva.servicio.toLowerCase() === servicio.toLowerCase() : true);

  return (
    <div className="flex justify-center items-center min-h-screen w-full text-white">
      <div className="w-full p-4 shadow-lg rounded-lg bg-gray-200 ">
        <h1 className="text-2xl font-bold mb-4 text-center text-zinc-800">Panel De Turnos</h1>

        {/* Componente de calendario con las reservas */}
        <AdminCalendar reservas={reservasHardcoded} onDateChange={setFecha} selectedDate={fecha} />

        <div className="m-2">
          <label htmlFor="search" className="block text-lg font-medium">Buscar por Nombre:</label>
          <input
            type="text"
            id="search"
            placeholder="Ingresa Un Nombre"
            className="border p-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="m-2">
          <label htmlFor="servicio" className="block text-lg font-medium">Filtrar por Servicio:</label>
          <select
            id="servicio"
            className="border p-2 w-full text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Corte">Corte</option>
            <option value="Barba">Barba</option>
            <option value="Color">Color</option>
          </select>
        </div>

        <h2 className="text-xl mb-2 text-center">Reservas para el {new Date(fecha).toLocaleDateString()}</h2>

        {filteredReservas.length > 0 ? (
          <table className="min-w-full shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500">
              <tr>
                <th className="py-2 px-2 border-b">Nombre</th>
                <th className="py-2 px-2 border-b text-center">Servicio</th>
                <th className="py-2 px-1 border-b text-center">Horario</th>
                <th className="p-2 pb-3 border-b text-center font-extrabold text-4xl">+</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-gray-600">
                  <td className="py-2 px-2 border-b h-20 w-10">{reserva.nombre}</td>
                  <td className="py-2 px-1 border-b text-center">{reserva.servicio}</td>
                  <td className="py-2 px-1 border-b text-center">{reserva.horario}</td>
                  <td className="text-center border-b">
                    <button className="font-bold px-2 py-1 rounded-lg border border-red-600 bg-red-500 text-white transition-transform transform hover:scale-105">
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No hay reservas para esta fecha.</p>
        )}
      </div>
    </div>
  );
};

export default AdminReservasTable;
