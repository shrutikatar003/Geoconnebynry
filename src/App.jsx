import { useState } from 'react'
import './App.css'
import ProfileMapExplorer from './components/ProfileMapExplorer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProfileMapExplorer />;

    </>
  )
}

export default App
