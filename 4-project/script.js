const rollBtn = document.getElementById("rollBtn");
const diceContainer = document.getElementById("diceContainer");
const diceCountSelect = document.getElementById("diceCount");
const statsList = document.getElementById("statsList");

const stats = [0, 0, 0, 0, 0, 0];

const diceFaces = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
];

rollBtn.addEventListener("click", rollDice);

function rollDice() {
    const count = Number(diceCountSelect.value);

    diceCountainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * 6) + 1;

        stats[value - 1]++;;

        const dice = document.createElement("div");
        dice.classList.add("dice", "roll-animation");
        dice.textContent = diceFaces[value - 1];

        diceContainer.appendChild(dice);
    }

    updatestats();
}

function updatestats() {
    statsList.innerHTML = `
        <li>1 : ${stats[0]}</li>
        <li>2 : ${stats[1]}</li>
        <li>3 : ${stats[2]}</li>
        <li>4 : ${stats[3]}</li>
        <li>5 : ${stats[4]}</li>
        <li>6 : ${stats[5]}</li>
    `;
}