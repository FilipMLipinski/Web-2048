import {useState} from 'react';

function RestartButton() {
  return (
    <button>
      Restart
    </button>
  );
}

function GameWindow () {
  const [squares, setSquares] = useState(Array(16).fill(0)); 
  function handleKeyPress(event){
    console.log(event.key);
  }
  function handleClick(i) {
    let nextSquares = squares.slice();
    if(squares[i]){
      nextSquares[i] = null;
    }
    else{
      nextSquares[i] = 2048;
    }
    setSquares(nextSquares);
  }
  return(
    <>
    <div className="gameWindow" onKeyDown={handleKeyPress}>
      <div className="gameRow">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className="gameRow">
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />     
      </div>
      <div className="gameRow">
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />     
      </div>
      <div className="gameRow">
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />     
      </div>
    </div>
    </>
  );
}

function Square({value, onSquareClick}) {
  let clickedStatus;
  let message = "";
  if(value){
    clickedStatus = "clicked";
    message = "hello";
  }
  else{
    clickedStatus = "unclicked";
  }
  return(
    <button clicked={clickedStatus} className="square" onClick={onSquareClick}>
      {message}
    </button>
  );
}

export default function MyApp() {
  return (
    <>
    <div id="app">
      <GameWindow />
    </div>
    </>
  );
}