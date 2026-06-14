import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>  {
    console.log(e)
    setCount(count + 1);
  }

  return (
    <>  
      Click Count: {count}
      <button className="my-button" onClick={(e) => onClick(e)}>
        Click me
      </button>
    </>
  )
}

export default App
