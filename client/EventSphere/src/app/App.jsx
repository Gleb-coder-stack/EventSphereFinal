import {useContext, useEffect, useState} from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "./context.js";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import Header from "../widgets/Header/Header.jsx";
import Footer from "../widgets/Footer/Footer.jsx";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import classes from '../styles/App.module.css'
import { YMaps } from "@iminside/react-yandex-maps";


const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const {user} = useContext(Context);

  useEffect(() => {
    const checkAuth = async () => {
      await user.checkToken(); // Дожидаемся проверки токена
      setLoading(false); // Только потом выключаем загрузку
    };
      console.log(user.role, 'role')
    checkAuth().finally(() => {setLoading(false)}); // После проверки выключаем загрузку
  }, []);

  if(loading){
    return (<p>Страница загружается</p>)
  }

  return (
      <YMaps query={{ apikey: "4b4e362a-2835-4a2d-b747-7eff66cc1e23" }}>
      <BrowserRouter>
          <div className={classes.wrapper}>
              <Header />
              <main className={classes.content}>
                  <AppRouter />
              </main>
              <Footer />
          </div>
          <ToastContainer />
      </BrowserRouter>
      </YMaps>
  )
})

export default App
