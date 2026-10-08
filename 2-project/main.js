let randomNumber = Math.floor(Math.random() * 100) + 1; 
let attempts = 0; 

function checkGuess() { 
    let guess = Number(document.getElementById("guessInput").value); 
    let message = document.getElementById("message"); 

    if (guess < 1 || guess > 100) { 
        message.textContent = "Enter a number from 1 to 100"; 
        return; 
    } 

    attempts++; 
    document.getElementById("attempts").textContent = attempts; 

    if (guess === randomNumber) { 
        message.textContent = "Correct! You guessed the number!"; 
    } else if (guess < randomNumber) { 
        message.textContent = "📈 Too low! Try again."; 
    } else if (guess > randomNumber) { 
        message.textContent = "📉 Too high! Try again."; 
    } 
} 

function newGame() { 
    randomNumber = Math.floor(Math.random() * 100) + 1; 
    attempts = 0; 
    document.getElementById("attempts").textContent = attempts; 
    document.getElementById("message").textContent = ""; 
    document.getElementById("guessInput").value = ""; 
}
