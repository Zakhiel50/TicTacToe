// Modification and improvement to be made to the project:
// - Improve performance with an alternative to setInterval
// - Optimize code structure
// - Add a button which will then restart a game keeping the names of the players
// - Add a victory counter.

const container = document.querySelector("ul");
const player1 = prompt("Enter player's 1 name");
const player2 = prompt("Enter player's 2 name");
const auTourDe = "Au tour de ";
let counter = 0;
let currentGame = true;
const whosTurn = document.querySelector(".turnPlayer");
const btn = document.querySelector("button")




function endGame() {
  btn.classList.remove("hidden")
  btn.classList.add("visible")

  currentGame = false;
  return currentGame;
}
  

// Create squares
const squares = [];

function createSquare(i) {
  const square = document.createElement("li");
  square.classList.add(`square${i}`, "square");

  square.addEventListener("click", function () {
    if (currentGame === false) {
      // stop eventListener
    } 
    else {
      handleClick(i);
    }
  });
  container.appendChild(square);
  
  return square;
}


// alternantes between X and O
function handleClick(i) {
  // if the square is X or O, he can't modify
  if (squares[i].textContent !== "X" && squares[i].textContent !== "O"){
    if (counter !== 9) {
      
      if (counter % 2 === 0) {
        squares[i].textContent = "X";
        counter++;
      } 
      else if (counter % 2 === 1) {
        squares[i].textContent = "O";
        counter++;
      }
    } 
    else {
      endGame()
    }
  }
}

// alternate CSS if it's turn to player 1 or player 2
function alternateXY() {
  if (counter !== 9) {
    if (counter % 2 === 0) {
      whosTurn.innerHTML = `It's ${player1}'s turn ( X )`;
      whosTurn.style.backgroundColor = "lightgreen";

    } 
    else {
      whosTurn.innerHTML = `It's ${player2}'s turn ( O )`;
      whosTurn.style.backgroundColor = "yellow";
    }
  } 
  else {
    endGame()
  }
  

}

// Add the CSS if you win
function win(n1, n2, n3) {
  const lignColumn = [squares[n1], squares[n2], squares[n3]];

  if (squares[n1].textContent === "X") {
    whosTurn.style.backgroundColor = "lightgreen";
    for (let i = 0; i < lignColumn.length; i++) {
      lignColumn[i].classList.add("lightgreen");
    }
    whosTurn.innerHTML = `${player1}'s win! `;
  }   else {
    whosTurn.style.backgroundColor = "yellow";
    for (let i = 0; i < lignColumn.length; i++) {
      lignColumn[i].classList.add("yellow");
    }
    whosTurn.innerHTML = `${player2}'s win! `;
  }
  endGame()
}

// Checks if a row, columns or diagonal is completed by the same symbol
function checkWinConditions() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (const condition of winConditions) {
    const [n1, n2, n3] = condition;
    if (
      squares[n1].textContent && 
      squares[n1].textContent === squares[n2].textContent &&
      squares[n1].textContent === squares[n3].textContent
    ) {
      win(n1, n2, n3);
    } else if(counter === 9 && 
      whosTurn.innerHTML != `${player1}'s win! ` && 
      whosTurn.innerHTML != `${player2}'s win! `
      ) {
      whosTurn.innerHTML = "Draw";
      whosTurn.style.backgroundColor = "grey";
    }
  }
}

if (currentGame === true) {
  for (let i = 0; i < 9; i++) {
  squares[i] = createSquare(i);
  }
  setInterval(alternateXY, 1000);
  setInterval(checkWinConditions, 1000);
} 



btn.addEventListener("click", resetGame);

function resetGame() {
  
  for (let i = 0; i < squares.length; i++) {
    console.log(squares[i])
    squares[i].innerHTML = ""
    squares[i].classList.remove("lightgreen")
    squares[i].classList.remove("yellow")
  }
  currentGame = true
  counter = 0
  btn.classList.remove("visible")
  btn.classList.add("hidden")
}

 



