const board = document.getElementById('board')
let isX = false
let winner = false
let squares = 9
let killSwitch = false
let verticalChecked = false

document.getElementById("button-reset").addEventListener("click", endGame)
document.getElementById("button-continue").addEventListener("click", continueGame)

const changeInfo = document.getElementById('container-info')


board.addEventListener("click", checkIfNumber)
changeInfo.addEventListener("click", changeNumberSquares)
document.getElementById("new-game").addEventListener("click", resetGame)


document.querySelectorAll("numberOfSquares").forEach(each => each.addEventListener("click", changeNumberSquares))

function continueGame() {
    document.getElementById('popup').style.display = "none"
}

function endGame() {
    killSwitch = true
    document.getElementById('popup').style.display = "none"
    resetGame()
}






function changeNumberSquares(e) {
    console.log(e.target.innerHTML)
    
    let currentNumberOfSquares = squares
    
    // resetGame()
    let updateNumberOfSquares = e.target.innerHTML
    // checks if user is clicking current # of squares:

    const sameSquare = (squares == e.target.innerHTML)

    if ((e.target.id) && (e.target.innerHTML) && !sameSquare) {
        
       // squares = e.target.innerHTML
        
    killSwitch = false
    
    resetGameTwo(JSON.parse(updateNumberOfSquares), currentNumberOfSquares)
    
    //render(squares)
    
    }
    
    // else if (!sameSquare)
    
    else if (sameSquare) {alert(`You already have ${squares} squares selected`)}
    
    else {}
    
   
}

function checkIfNumber(i) {
    
  const id = i.target.id;

  if (id !== '') {
    try {
      const parsedId = parseInt(id, 10);
      if (Number.isInteger(parsedId) && !killSwitch) {
        changeToXOrO(parsedId);
      }
      else if (Number.isInteger(parsedId) && killSwitch) {
        console.log("Sorry, Game is Already Over!")
          
      }
      
      else {}
      
    } catch (err) {
      console.error('Please click a square');
    }
  }
}


function changeToXOrO(parsedId) {
    
  const currentSquare = document.getElementById(parsedId);
  if (currentSquare.innerHTML == "X" || currentSquare.innerHTML == "O") {
        
        console.log("Please choose another square");
        
        
  } else {
        currentSquare.innerHTML = isX ? "X" : "O"
        isX = !isX
        updateWhosePlay(isX)
        
  }
  checkHorizontal()
}

function checkHorizontal() {
    let columns = Math.sqrt(squares)
    for (let i=0; i < columns; i++) {
        {
        checkHorizontalTwo(i)
    }}
    checkVertical()
}

function checkHorizontalTwo(inputNumber) {
    let numbersArray = []
    const startingNumber = inputNumber * Math.sqrt(squares)
    for (let i = startingNumber; i < (Math.sqrt(squares) * (inputNumber + 1)); i++) {
        numbersArray.push(document.getElementById(`${i}`).innerHTML)
    }
    checkIfEqual(numbersArray, startingNumber, "horizontal")
}

function checkMainDiagonal() {
    
    let numbersArray = []
    const startingNumber = 0

    for (let i = startingNumber; i < Math.sqrt(squares); i++) {
        numbersArray.push(document.getElementById(`${i + (Math.sqrt(squares) * i)}`).innerHTML)
    }

    checkIfEqual(numbersArray, startingNumber, "mainDiagonal")
    checkSecondaryDiagonal()
}


function checkSecondaryDiagonal() {
    
    let numbersArray = []
    const startingNumber = (Math.sqrt(squares) - 1)

    for (let i = 0; i < Math.sqrt(squares); i++) {
        numbersArray.push(document.getElementById(`${startingNumber * (i + 1)}`).innerHTML)
    }

    checkIfEqual(numbersArray, startingNumber, "secondaryDiagonal")
}
    

function checkVertical() {
    let columns = Math.sqrt(squares)
    for (let i=0; i < columns; i++) {
        {
        checkVerticalTwo(i)
    }}
checkMainDiagonal()
}

// fix checkVerticalTwo so that it applies to vertical not horizontal

function checkVerticalTwo(inputNumber) {
    let numbersArray = []
    const startingNumber = inputNumber
    
    
    for (let i = inputNumber; i < squares; i += Math.sqrt(squares)) {
        numbersArray.push(document.getElementById(`${i}`).innerHTML)
    }
    
    checkIfEqual(numbersArray, startingNumber, "vertical")
}


function checkIfEqual(numbersArray, startingNumber, direction) {

    const numbersAreEqual = numbersArray.every(val => val === numbersArray[0])    
    
    let checkIfSquaresEmpty = []
    for (let i = 0; i < squares; i++) {
        let currentSquare = document.getElementById(`${i}`)
         
            checkIfSquaresEmpty.push(currentSquare.innerHTML)  }
    
    let boardFull = checkIfSquaresEmpty.includes("&nbsp;")
    
    
    
    if (numbersAreEqual && (numbersArray[0] === "X" || numbersArray[0] === "O")) {
        killSwitch = true
        colorSquares(startingNumber, direction)
        }

    else if (!boardFull && !winner) {
        document.getElementById('whoseplay').innerHTML = "There are No Winners"
        document.getElementById('whoseplay').style.backgroundColor = "red"
        }
    
    
}

function colorSquares(startingNumber, direction) {
    winner = true
    if (direction == "horizontal") {
    
        for (let i=0; i < Math.sqrt(squares); i++) {
            document.getElementById(`${startingNumber + i}`).style.backgroundColor = "lightgreen"
        }
    }
    
    else if (direction == "vertical") {
       
        for (let i = startingNumber; i < squares; i += Math.sqrt(squares)) {
            document.getElementById(`${i}`).style.backgroundColor = "lightgreen"
        }
    
    }
    
    else if (direction == "mainDiagonal") {
       
        for (let i = 0; i < Math.sqrt(squares); i++) {
            document.getElementById(`${i + (Math.sqrt(squares) * i)}`).style.backgroundColor = "lightgreen"
        }    
    }
    
    else if (direction == "secondaryDiagonal") {
       
        for (let i = 0; i < Math.sqrt(squares); i++) {
            document.getElementById(`${startingNumber * (i + 1)}`).style.backgroundColor = "lightgreen"
        }    
    }
    document.getElementById('whoseplay').innerHTML = isX ? "O Won the Game!" : "X Won the Game!"
    document.getElementById('whoseplay').style.backgroundColor = "#00ff00"
}

function updateWhosePlay(isX) {
    isX ? document.getElementById('whoseplay').innerHTML = "Whose Play? X" : document.getElementById('whoseplay').innerHTML = "Whose Play? O"
}

function createSquare(inputNumber) {
  let boardSquares = '';
  
  for (let i = 0; i < inputNumber; i++) {
    boardSquares += `<div class="square" id="${i}">&nbsp;</div>`;
  }
  return boardSquares;
  assignIds(inputNumber)
}


function assignIds(inputNumber) {

    const squareLetters = [];
    for (let i = 0; i < inputNumber; i++) {
    squareLetters[i] = document.getElementById(i).innerHTML;
    }
}

function render(number) {
    document.getElementById('whoseplay').style.backgroundColor = "#dfdfff"
    updateWhosePlay()

    board.innerHTML = createSquare(number)
    document.documentElement.style.setProperty('--columns', Math.sqrt(number));
    
}


function resetGameTwo(updateNumberOfSquares, currentNumberOfSquares) {
    console.log("resetgametwo")
    
    
    createSquare(updateNumberOfSquares)
    
        let checkIfSquaresEmpty = []
    
    for (let i = 0; i < currentNumberOfSquares; i++) {
        let currentSquare = document.getElementById(`${i}`)
         
            checkIfSquaresEmpty.push(currentSquare.innerHTML)  }
    
    let boardNotEmpty = ((checkIfSquaresEmpty.includes("X")) || (checkIfSquaresEmpty.includes("O")))          
    if (boardNotEmpty && !killSwitch && (checkIfSquaresEmpty.includes("&nbsp;"))) {
        
        document.getElementById('popup').style.display = "flex"
        } 
    
    else {
        killSwitch = false
        for (let i = 0; i < updateNumberOfSquares; i++) {
        if (document.getElementById(`${i}`)) {
        document.getElementById(`${i}`).innerHTML = "&nbsp;"
        isX = false
        
        render(updateNumberOfSquares)}
    }
        } 
}





function resetGame() {
    createSquare(squares)
        let checkIfSquaresEmpty = []
    
    for (let i = 0; i < squares; i++) {
        let currentSquare = document.getElementById(`${i}`)
         
            checkIfSquaresEmpty.push(currentSquare.innerHTML)  }
    
    let boardNotEmpty = ((checkIfSquaresEmpty.includes("X")) || (checkIfSquaresEmpty.includes("O")))          
    if (boardNotEmpty && !killSwitch && (checkIfSquaresEmpty.includes("&nbsp;"))) {
        
        document.getElementById('popup').style.display = "flex"
        } 
    
    else {killSwitch = false
        for (let i = 0; i < squares; i++) {
        if (document.getElementById(`${i}`)) {
        document.getElementById(`${i}`).innerHTML = "&nbsp;"
        isX = false
        render(squares)}
    }
        } 
}

render(squares)