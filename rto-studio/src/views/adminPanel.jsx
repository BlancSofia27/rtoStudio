import { useNavigate } from "react-router-dom"
import AdminReservasTable from "../components/reservasTable"

const AdminPanel = () => {;
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-3 h-20 w-full bg-zinc-900">
        <button
          onClick={() => navigate("/adminPrecios")} 
          className=" text-white p-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Administrar precios
        </button>
      </div>
      {/* Tabla de Reservas */}
      <AdminReservasTable />
    </div>
  )
}

export default AdminPanel
