const choices = ["rock", "paper", "scissors"]; 
const emojis = { rock: "✊", paper: "✋", scissors: "✌️" }; 

let playerScore = 0; 
let compyuterScore = 0; 
let round = 1; 

const playerChoice = document.getElementById("playerChoice"); 
const compyuterChoice = document.getElementById("compyuterCoice"); 
const result = document.getElementById("result"); 
const playerScoreText = document.getElementById("playerScore"); 
const compyuterScoreText = document.getElementById("compyuterScore"); 
const roundText = document.getElementById("round"); 

const buttons = document.querySelectorAll(".choice"); 

buttons.forEach(button => { 
    button.addEventListener("click", () => { 
        if(round > 5) return; 
        play(button.dataset.choice); 
    });
}); 

function randomChoice(){ 
    return choices[Math.floor(Math.random() * 3)]; 
} 

function play(player){ 
    const compyuter = randomChoice(); 
    
    playerChoice.textContent = emojis[player]; 
    compyuterChoice.textContent = emojis[compyuter]; 
    
    playerChoice.classList.add("animate"); 
    compyuterChoice.classList.add("animate"); 
    
    setTimeout(() => { 
        playerChoice.classList.remove("animate"); 
        compyuterChoice.classList.remove("animate"); 
    }, 400); 
    
    if(player === compyuter){ 
        result.textContent = "Draw!"; 
    } 
    else if( (player === "rock" && compyuter === "scissors") || 
             (player === "paper" && compyuter === "rock") || 
             (player === "scissors" && compyuter === "paper") ){ 
        playerScore++; 
        result.textContent = "You Win!"; 
    } 
    else { 
        compyuterScore++; 
        result.textContent = "Compyuter Wins!"; 
    } 
    
    playerScoreText.textContent = playerScore; 
    compyuterScoreText.textContent = compyuterScore; 
    
    if(round === 5){ 
        setTimeout(finishGame, 500); 
    } 
    
    round++; 
    roundText.textContent = Math.min(round, 5); 
} 

function finishGame(){ 
    if(playerScore > compyuterScore){ 
        result.textContent = "You won the Best of 5! 🎉"; 
    } 
    else if(compyuterScore > playerScore){ 
        result.textContent = "Compyuter won! 🤖"; 
    } 
    else { 
        result.textContent = "It's a draw! 🤝"; 
    } 
}
