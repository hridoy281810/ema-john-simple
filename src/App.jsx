import { useState } from 'react'


import './App.css'
import Header from './components/Heaader/Header'
import Shop from './components/Shop/shop'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Header></Header>
    <Shop></Shop>
    </div>
  )
}

export default App
