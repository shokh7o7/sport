let count = 0;
let historyListArray = [];

const counter = document.querySelector(".counter"); 
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const historyList = document.getElementById("history");

function updateCounter() {
    counter.textContent = count;
}

function displayHistory() {
    historyList.innerHTML = "";
    historyListArray.forEach(function(value){
        const li = document.createElement("li");
        li.textContent = value;
        historyList.appendChild(li);
    });
}

increaseBtn.addEventListener("click", function(){
    count++;
    updateCounter();
});

decreaseBtn.addEventListener("click", function(){
    count--;
    updateCounter();
});

resetBtn.addEventListener("click", function(){
    count = 0;
    updateCounter();
});

saveBtn.addEventListener("click", function(){
    historyListArray.push(count);
    displayHistory();
});
