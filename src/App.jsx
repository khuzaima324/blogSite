import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

    if(loading){
      return <h1>Loading...........</h1>
    }
    else{
      return (
        <div className='min-h-screen bg-gray-400 flex items-center'>
          <div className='w-full block'>
            <Header/>
              <main>
                <Outlet/>
              </main>
            <Footer/>
          </div>
        </div>
      )
    }
  

}

export default App
