import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetStates } from '../redux/servicesSlice';
import SelectServicio from '../components/selectServicio'; 
import SelectCalendar from '../components/Calendar'; 
import SelectHorario from '../components/selectHorario';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { sendReservationEmail } from '../components/sendReservationEmail';
import Swal from 'sweetalert2';
import mp from '../assets/mp.png'
import Footer from '../components/footer';
const Reservar = () => {
  const dispatch = useDispatch();
  const { service, date, hour, profesional } = useSelector((state) => state.services);
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');

  const animationVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 1.0 } },
    exit: { opacity: 0, x: -20, transition: { duration: 1.0 } },
  };

  // Efecto para avanzar automáticamente al siguiente paso basado en el estado global
  useEffect(() => {
    if (service && step === 1) {
      setStep(2);
    }
  }, [service]);

  useEffect(() => {
    if (date && step === 2) {
      setStep(3);
    }
  }, [date]);

  useEffect(() => {
    if (hour && step === 3) {
      setStep(4);
    }
  }, [hour]);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (!nombre || !email || !emailConfirm || !date || !hour || !service) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Completa todos los campos para realizar la reserva',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (email !== emailConfirm) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los correos electrónicos no coinciden',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const dataToSend = {
      nombre,
      service,
      date,
      hour,
      email,
    };

    try {
      await sendReservationEmail(dataToSend);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reserva Realizada',
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();

      setTimeout(() => {
        window.location.href = '/confirmacion';
      }, 3000);
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un problema al enviar la reserva',
        showConfirmButton: true,
      });
    }
  };

  const resetForm = () => {
    dispatch(resetStates());
    setNombre('');
    setEmail('');
    setEmailConfirm('');
  };

  return (
    <div>
      <Hero />
      <div className="flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SelectServicio />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SelectCalendar />
              <button
                onClick={() => setStep(1)}
                className="mt-4 p-2 bg-pink text-white rounded"
              >
                Volver
              </button>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SelectHorario servicioSeleccionado={service} />
              <button
                onClick={() => setStep(2)}
                className="m-4 p-2 bg-pink text-white rounded"
              >
                Volver
              </button>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mt-4 text-black font-normal">
                <h3 className='text-center text-white text-xl my-2 bg-gradient-to-r from-pink to-pink1 '>Detalles de la reserva</h3>
                <p>Serivico: {service}</p>
                <p>Fecha: {date}</p>
                <p>Horario: {hour}</p>
                {/* <p>Profesional: {profesional}</p> */}
              </div>
              <form onSubmit={handleFormSubmit} className="mt-4 text-black">
                <div className="mb-4">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                  <label>Confirmar Email:</label>
                  <input
                    type="email"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  {emailConfirm && (
                    <div>
                    <span
                      className={`text-sm ${
                        email === emailConfirm ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {email === emailConfirm ? 'Los correos coinciden' : 'Los correos no coinciden'}
                    </span>
                    <motion.div
              key="step1"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
                 <button className="flex flex-row bg-blue-400 text-white text-center text-md px-4 py-2 font-light rounded-md mt-4 relative group">
  <img src={mp} alt="" className="w-9 m-1" />
  pagar con Mercado Pago
  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    Botón a modo ilustrativo donde los clientes pagarán
  </span>
</button>

                     </motion.div>
                    </div>
                  )}
                </div>
                <div className='flex flex-row justify-between'>
                <button
                  onClick={() => setStep(3)}
                  className=" p-2 bg-gray-500 text-white rounded"
                >
                  Volver
                </button>
                {/* <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Confirmar Reserva
                </button> */}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer/>
    </div>
  );
};

export default Reservar;
