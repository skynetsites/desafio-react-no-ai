import { useState, useEffect } from "react"
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css"

function App() {
  //const [count, setCount] = useState(0)
  const [circles, setCircles] = useState([])
  const [undone, setUndone] = useState([])

  useEffect(() => {
    document.body.addEventListener("click", addCircle)
    return () => {
      document.body.removeEventListener("click", addCircle)
    }
  }, [])

  const addCircle = (e) => {
    const svgRect = e.currentTarget.getBoundingClientRect()
    setCircles((c) => [
      ...c, { 
              cx: e.clientX - svgRect.left, 
              cy: e.clientY - svgRect.top + 3, 
              r: 20, // Tamanho do circulo
              f: 'red', // Cor do circulo
            },
    ]);
    setUndone([])
  }

  const undo = (e) => {
    e.stopPropagation()
    if (!circles.length) return
    const item = circles[circles.length - 1]
    setUndone((u) => [...u, item])
    setCircles((c) => c.slice(0, -1))
  }

  const redo = (e) => {
    e.stopPropagation()
    if (!undone.length) return
    const item = undone[undone.length - 1]
    setCircles((c) => [...c, item])
    setUndone((u) => u.slice(0, -1))
  }

  return (
    <>
      <div>
        <button onClick={undo}>Desfazer</button>
        <button onClick={redo}>Refazer</button>
      </div>
      <svg>
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.f} />
        ))}
      </svg>
    </>
  )
}

export default App
