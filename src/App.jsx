import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Articles from './Components/Articles'
import Article from './Components/Article'
import { UserProvider } from './Components/UserContext';
import SignIn from './Components/SignIn'

function App() {


  return (
    <UserProvider>
    <Header/>
    <NavBar/>
    <Routes>
        <Route path="/" element={<Articles/>}/>
        <Route path="/articles/:article_id" element={<Article />}/>
        <Route path="/signin" element={<SignIn />}/>
    </Routes>
    <Footer/>
    </UserProvider>
  )
}

export default App
