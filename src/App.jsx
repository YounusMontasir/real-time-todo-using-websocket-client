import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-3xl font-bold underline'>
            <p className='text-xl font-bold'>Hello World</p>
       </div>
    </>
  )
}

export default App
