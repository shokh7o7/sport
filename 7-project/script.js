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
const symbolsLetters = "!@#$%^&*";

let passwordValue = "";
let isPasswordVisible = false;