
    // DOM Elements and variables

const image = document.querySelector(".image");
const button = document.querySelector(".get");
const save = document.querySelector(".save");
const textField = document.querySelector("#email");
const array = document.querySelector(".list");
const hearts = document.querySelector(".hearts");
const kittenImages = ["Default"]

    // Variables for displaying the time and date

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes();
let dateTime = date + ' ' + time;

    // Email Validation function

function ValidateEmail(inputText, function1, function2) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        function1();
    } else {
        function2();
    }
}

    // Function to show the invalid email warning

function invalidEmail() {
    alert("You have not entered a valid email adress.");
}

    // Fetch request function for getting images from unsplash 

function renderKitten() {
    fetch(`https://source.unsplash.com/600x400/?cute-kittens`).then((response) => {
        image.innerHTML = `
        <img class="kitten-image" src="${response.url}" alt="kitten image"/>
      `
    })
    save.disabled = false;
    button.disabled = true;
    setTimeout(function(){ 
        button.disabled = false; 
    }, 3000);
}

    // Function the save button

function saveKitten() {
    let kitten = document.createElement("a");
    let img = document.querySelector(".kitten-image");
    let picture = document.createElement("img");

    kitten.innerText = textField.value + " Kitten " + kittenImages.length + ": " + img.src;
    array.appendChild(kitten);
    array.appendChild(picture);
    picture.src = img.src;
    picture.style.height = "100px"
    kittenImages.push(kitten);
    kitten.classList.add("kitten" + kittenImages.length);
    kitten.target = "_blank";
    kitten.href = img.src;
    save.disabled = true;
}

    // Event Listeners 

button.addEventListener("click", () => ValidateEmail(textField, renderKitten, invalidEmail));
save.addEventListener("click", saveKitten);