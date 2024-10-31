import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHour } from '../redux/servicesSlice';

const SelectHorario = () => {
  const dispatch = useDispatch();
  const { hour, service } = useSelector((state) => state.services);
  const [selectedHorario, setSelectedHorario] = useState(hour);
  const [horarios, setHorarios] = useState([]);
  const [horariosDesactivados, setHorariosDesactivados] = useState(new Set());

  // Genera todos los horarios posibles
  const generarHorarios = () => {
    const horariosGenerados = [];
    const startHour = 8;
    const endHour = 19;
    const interval = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute <= 30; minute += interval) {
        const formattedHour = `${hour.toString().padStart(2, '0')}.${minute === 0 ? '00' : '30'}`;
        horariosGenerados.push(formattedHour);
      }
    }

    return horariosGenerados;
  };

  // Desactiva horarios aleatorios
  const desactivarHorariosAleatorios = (horariosGenerados) => {
    const totalDesactivar = Math.floor(horariosGenerados.length * 0.3);
    const desactivados = new Set();

    while (desactivados.size < totalDesactivar) {
      const index = Math.floor(Math.random() * horariosGenerados.length);
      desactivados.add(horariosGenerados[index]);
    }

    return desactivados;
  };

  // Muestra un número limitado de horarios aleatorios
  const seleccionarHorariosAleatorios = (horariosGenerados, cantidad) => {
    const shuffled = horariosGenerados.sort(() => Math.random() - 0.5); // Mezcla los horarios
    return shuffled.slice(0, cantidad); // Retorna los primeros 'cantidad' horarios
  };

  useEffect(() => {
    const horariosGenerados = generarHorarios();
    const desactivadosAleatorios = desactivarHorariosAleatorios(horariosGenerados);
    const horariosSeleccionados = seleccionarHorariosAleatorios(horariosGenerados, 8); // Cambia 8 por la cantidad deseada de horarios mostrados
    setHorarios(horariosSeleccionados);
    setHorariosDesactivados(desactivadosAleatorios);
  }, [service]);

  const handleHorarioClick = (hora) => {
    setSelectedHorario(hora);
    dispatch(selectHour(hora));
  };

  const isHorarioPasado = (hora) => {
    const now = new Date();
    const [h, m] = hora.split('.');
    const horarioDate = new Date();
    horarioDate.setHours(h, m === '00' ? 0 : 30);
    return horarioDate < now;
  };

  return (
    <div className="flex flex-col items-center mt-4 text-black">
      <h1>{service}</h1>
      <h3 className="mb-4">Horarios Disponibles</h3>
      <div className="grid grid-cols-4 gap-4 justify-center p-3">
        {horarios.length > 0 ? (
          horarios.map((hora, index) => {
            const isPasado = isHorarioPasado(hora);
            const isDesactivado = horariosDesactivados.has(hora);
            const disabled = isPasado || isDesactivado;

            return (
              <button
                key={index}
                onClick={() => !disabled && handleHorarioClick(hora)}
                className={`w-16 h-12 font-semibold border rounded transition duration-300 ease-in-out text-center ${
                  selectedHorario === hora ? 'bg-green-500' : 'bg-zinc-200'
                } text-black ${disabled ? 'line-through text-gray-400' : ''}`}
                disabled={disabled}
              >
                {hora}
              </button>
            );
          })
        ) : (
          <p className="text-white">No hay horarios disponibles</p>
        )}
      </div>
    </div>
  );
};

export default SelectHorario;
