import { useState } from 'react'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Articles from './Components/Articles'
function App() {

  return (
    <div>
    <Header/>
    <NavBar/>
    <Routes>
        <Route path="/" element={<Articles/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
