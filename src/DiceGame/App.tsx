import { useState } from "react";
import "./App.css"
import React, { useRef } from 'react'
import ReactDice, { ReactDiceRef } from 'react-dice-complete'

function App() {
  const [playerDice, setPlayerDice] = useState();
  const [cpuDice, setCpuDice] = useState();
  const [winnerTxt, setWinnerTxt] = useState();

  const rollDice = (total, values) => {
    console.log(values)
    const playerRoll = values[0];
    const cpuRoll = values[1];


    setPlayerDice(playerRoll);
    setCpuDice(cpuRoll);


    if (playerRoll > cpuRoll) {
      setWinnerTxt("player wins!");

    } else if (cpuRoll > playerRoll) {
      setWinnerTxt("computer wins!");
    } else if (cpuRoll === playerRoll) { setWinnerTxt("everybody wins! Play again") }
  };

  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (totalValue: number, values: number[]) => {
    console.log('individual die values array:', values)
    console.log('total dice value:', totalValue)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
  }

  return (
    <div className="diceStyle">
      <h1> Dice Game</h1>

      <button onClick={rollAll}>Roll Dice</button>
      <h6> Your Roll:{playerDice}</h6>
      <h6>Computer Roll{cpuDice}</h6>

      <ReactDice
        numDice={2}
        ref={reactDice}
        rollDone={rollDice}
      />


      <h2>{winnerTxt}</h2>

    </div>);
}



export default App