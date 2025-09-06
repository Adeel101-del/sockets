import Navbar from './components/Navbar'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Landing from './components/Landing'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { index: true, element: <Landing />},
        { path: 'home', element:  <Home />},
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }
      ]
    }

  ]);

  return (
    <div id='App'>
      <RouterProvider router={router} />

    </div>
  )
}

export default App
