// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const containerRef = React.createRef()

  React.useEffect(() => {
    const tiltNode = containerRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return () => {
      tiltNode.vanillaTilt.destroy()
    }
  }, [containerRef])

  return (
    <div className="tilt-root" ref={containerRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
