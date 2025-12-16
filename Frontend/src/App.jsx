import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import Navbar from './components/Navbar'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>

      <Route path="/register" element={<Register/>}/>

      <Route path="/" element={<ProtectedRoute><Navbar/><Search/></ProtectedRoute>}/>

      <Route path="/watchlist" element={<ProtectedRoute><Navbar/><Watchlist/></ProtectedRoute>}/>

    </Routes>
  )
} 
export default App
