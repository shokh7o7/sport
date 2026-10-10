const password = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");

const slider = document.getElementById("lenghtSlider");
const lenghtValue = document.getElementById("lenghtValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const streightBar = document.getElementById("streightBar");
const streightText = document.getElementById("streightText");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbersLetters = "0123456789";
const symbolsLetters = "!@#$%^&*()_-+[]{}<>?/";

slider.addEventListener("input", () => {
    lenghtValue.innerText = slider.ariaValueMax;});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    if(password.value==="") return;
    navigator.clipboard.writeText(password.value);
    copyBtn.innerText = "Copied!";  
    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 1500);

});

function generatePassword() {
    let characters = "";
    
    if(uppercase.checked)
         characters += upperLetters;
    if(lowercase.checked)
         characters += lowerLetters;
    if(numbers.checked)
         characters += numbersLetters;
    if(symbols.checked)
         characters += symbolsLetters;
    if(characters === ""){
        alert("Please select at least one character type."); 
        return;
    }

    let pass="";

    for(let i=0; i<slider.value; i++){
        let randomIndex = Math.floor(Math.random() * characters.length);
        pass += characters[randomIndex];
    }
    password.value = pass;

    updateStrength();
}


function updateStrength(){
   let score = 0;
   if(uppercase.checked) score++;
   if(lowercase.checked) score++;
   if(numbers.checked) score++;
   if(symbols.checked) score++;
   
   if(slider.value >= 12) score++;
   if(slider.value >= 18) score++;

   if(score <= 2){
        streightBar.style.width = "30%";
        streightBar.style.background = "red";
        streightText.innerText = "Strength: Weak";
   }

    else if(score <= 4){
        streightBar.style.width = "65%";
        streightBar.style.background = "orange";
        streightText.innerText = "Strength: Medium";
    }

    else{
        streightBar.style.width = "100%";
        streightBar.style.background = "green";
        streightText.innerText = "Strength: Strong";
    }

}

generatePassword();