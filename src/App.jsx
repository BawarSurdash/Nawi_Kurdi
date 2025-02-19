import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import AddName from './components/addname'
import Fav from './components/fav'
import Messenger from './components/messenger'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/addname' element={<AddName />} />
        <Route path='/fav' element={<Fav />} />
        <Route path='/messenger' element={<Messenger />} />
      </Routes>
    </Router>
  )
}

export default App
