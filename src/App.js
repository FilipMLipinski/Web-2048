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

  function transposed(sq){
    let nsq = Array(16).fill(0);
    for(let c=0;c<4;c++){
      for(let r=0;r<4;r++){
        nsq[4*r+c] = squares[4*c+r];
      }
    }
    return nsq;
  }

  function rowReversed(sq){
    let nsq = Array(16).fill(0);
    for(let r=0;r<16;r+=4){
      for(let i=0;i<4;i++){
        nsq[r+i] = sq[r+(3-i)]; 
      }
    }
    return nsq;
  }

  function makeMove(moveName, sq){
    if(moveName==="RIGHT"){
      let nsq = rowReversed(sq);
      nsq = makeMove("LEFT", nsq);
      nsq = rowReversed(nsq);
      return nsq;
    }
    if(moveName==="LEFT"){
      let nsquares = sq.slice();
      for(let r=0; r<16; r+=4){
        let top=0;
        let cval;
        let pairing = false;
        for(let cidx=0;cidx<4;cidx++){
          if(nsquares[r+cidx]===0){
            continue;
          }
          if(pairing && nsquares[r+cidx]===cval){
            nsquares[r+top] = cval*2;
            top+=1;
            nsquares[r+cidx] = 0;
            pairing = false;
          } 
          else{
            if(pairing){
              top+=1;
            }
            if(cidx!==top){
              nsquares[r+top] = nsquares[r+cidx];
              nsquares[r+cidx] = 0;
            }
            cval = nsquares[r+top];
            pairing = true;
          }
        }
      }
      return nsquares;
    }
  }

  function makeRandomAppear(sq){
    let nextSquares = sq.slice();
    let freeIndices = [];
    for(let i=0;i<squares.length;i++){
      if(squares[i]===0){
        freeIndices.push(i);
      }
    }
    if(freeIndices.length>0){
      const r = Math.floor(Math.random()*freeIndices.length);
      const idx = freeIndices[r];
      nextSquares[idx] = 2;
    }
    return nextSquares;
  }

  function handleKeyPress(event){
    let sqslice = squares.slice();
    let movedSquares = sqslice;
    if(event.key==="a"){
      movedSquares = makeMove("LEFT", sqslice);
    }
    else if(event.key==="d"){
      movedSquares = makeMove("RIGHT", sqslice);
    }
    const addedRandom = makeRandomAppear(movedSquares);
    setSquares(addedRandom);
  }
  function handleClick(i) {
    let nextSquares = squares.slice();
    if(squares[i]){
      nextSquares[i] = 0;
    }
    else{
      nextSquares[i] = 2;
    }
    setSquares(nextSquares);
  }
  return(
    <>
    <div className="gameWindow" tabIndex={0} onKeyDown={handleKeyPress}>
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
    message = value;
  }
  else{
    clickedStatus = "unclicked";
  }
  return(
    <div clicked={clickedStatus} className="square" onClick={onSquareClick}>
      {message}
    </div>
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