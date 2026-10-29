import { useState } from 'react'
import HomeWrapper from './components/HomeWrapper'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomeWrapper />
    </>
  )
}

export default App
