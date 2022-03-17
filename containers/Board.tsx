import { useEffect, useState } from 'react'
import { Square } from '../components/Square'
type Player = 'X' | 'O' | 'Both' | null

const calcWinner = (square: Player[]) => {
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a]
    }
  }
  return null
}

export const Board = () => {
  const [square, setSquare] = useState(Array(9).fill(null))
  const [currentplayer, setCurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  )
  const [winner, setWinner] = useState<Player>(null)
  const setSquareValue = (index: number) => {
    const newData = square.map((value, i) => {
      if (i === index) {
        return currentplayer
      }
      return value
    })
    setSquare(newData)
    setCurrentPlayer(currentplayer === 'X' ? 'O' : 'X')
  }

  const reset = () => {
    setSquare(Array(9).fill(null))
    setWinner(null)
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
  }

  useEffect(() => {
    const win = calcWinner(square)
    if (win) {
      setWinner(win)
    }
    if (!win && !square.filter((square) => !square).length) {
      setWinner('Both')
    }
  }, [square])

  return (
    <div>
      {!winner && <p>Hey {currentplayer}, it is your turn!</p>}
      {winner && winner !== 'Both' && <p>Congratulations {winner}</p>}
      {winner && winner === 'Both' && <p>It is a draw! Please reset.</p>}

      <div className='grid'>
        {Array(9)
          .fill(null)
          .map((_, index) => {
            return (
              <Square
                key={index}
                winner={winner}
                onClick={() => setSquareValue(index)}
                value={square[index]}
              />
            )
          })}
      </div>
      <button className='reset' onClick={reset}>
        RESET
      </button>
    </div>
  )
}
