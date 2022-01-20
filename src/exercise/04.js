// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const cleanBoard = Array(9).fill(null)

function Game() {
  const [historySteps, setHistorySteps] = useLocalStorageState('history', [
    cleanBoard,
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0)

  const squares = historySteps[currentStep]
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function pushToHistory(stepSquares) {
    const stepsToKeep = historySteps.slice(0, currentStep + 1)
    setHistorySteps([...stepsToKeep, stepSquares])
    setCurrentStep(prev => prev + 1)
  }

  function selectSquare(square) {
    // There is already a winner
    if (winner) {
      return
    }
    // Square is not empty
    if (squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    pushToHistory(squaresCopy)
  }

  function restart() {
    setCurrentStep(0)
    setHistorySteps([cleanBoard])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} selectSquare={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {historySteps.map((step, index) => {
            return (
              <li key={`${JSON.stringify(step)}-${index}`}>
                <button
                  disabled={currentStep === index}
                  onClick={() => setCurrentStep(index)}
                >
                  Step {index + 1}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
