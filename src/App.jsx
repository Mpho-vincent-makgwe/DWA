import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import './Main.css'
import './NaviBar.css'
import Footer from'./Components/Footer.jsx'
import Header from'./Components/Header.jsx'
import Main from'./Components/Main.jsx'
import NavBar from'./Components/NavBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavBar />
        <Header />
        <Main />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
