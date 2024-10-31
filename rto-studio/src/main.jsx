
import App from "./App.jsx"
import "./index.css"
import "aos/dist/aos.css"
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
  </Provider>,
  
)