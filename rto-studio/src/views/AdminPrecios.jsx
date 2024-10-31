import { useNavigate } from 'react-router-dom';
import AdminPreciosTable from '../components/adminPreciosTable';

const AdminPrecios = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-3 h-20 w-full ">
        {/* Botón para redirigir al panel de administración */}
      <button
        onClick={() => navigate("/adminPanel")} // Redirige a /adminPanel
        className=" text-white p-2 rounded hover:bg-gray-800 transition duration-200"
      >
        Volver al Panel de Turnos
      </button>
  
  
</div>
      {/* Tabla de Reservas */}
      <AdminPreciosTable/>
    </div>
  );
};

export default AdminPrecios;