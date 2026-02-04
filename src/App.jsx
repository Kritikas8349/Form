import { useState } from 'react';
import './App.css';
import ForexSeminarForm from './components/ForexSeminarForm';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ForexSeminarForm/>
    </>
  )
}

export default App
