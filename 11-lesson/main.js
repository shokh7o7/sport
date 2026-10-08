const title = document.querySelector("#title")
const input = document.querySelector("#nameInput")
const button = document.querySelector("#btn")

button.addEventListener("click", function() {
    const name = input.value;

    title.textContent = "Salom, " + name + "!";
})