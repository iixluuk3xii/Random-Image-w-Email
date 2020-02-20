// DOM Elements and variables

const image = document.querySelector(".image");
const button = document.querySelector(".get");
const save = document.querySelector(".save");
const textField = document.querySelector("#email");
const array = document.querySelector(".list");
const hearts = document.querySelector(".hearts");
const kittenImages = [];
let userEmail = textField.value;
const users = [];
let color = "default";
let kittenColor = document.querySelector(`${".kitten" + kittenImages.length}`);

// Variables for displaying the time and date

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// User Object

function user(email, color) {
    this.email = email;
    this.color = color;
}

// Email Validation function

function ValidateEmail(inputText, function1, function2) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        function1();
    } else {
        function2();
    }
}

// function for generating a random color for a different users

function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

// Function to show the invalid email warning

function invalidEmail() {
    alert("You have not entered a valid email adress.");
}

// Fetch request function for getting images from unsplash 

function renderKitten() {

    let found = false;

    fetch(`https://source.unsplash.com/600x400/?cute-kittens`).then((response) => {
        image.innerHTML = `
        <img class="kitten-image" src="${response.url}" alt="kitten image"/>
      `
    })

    userEmail = textField.value;

    save.disabled = false;
    button.disabled = true;
    setTimeout(function () {
        button.disabled = false;
    }, 3000);

    // this loop checks to see if the user exists

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == userEmail) {
            found = true;
            break;
        }
    }

    if (found === true) {
        // do nothing
    } else {
        // Create new user
        let newUser = new user(userEmail, generateRandomColor())
        users.push(newUser);
        found = true;
    }
}

// Function the save button

function saveKitten() {
    let kitten = document.createElement("a");
    let img = document.querySelector(".kitten-image");
    let picture = document.createElement("img");
    let timeStamp = document.createElement("p");

    // this code check the color value given to the user and uses it to style the text

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userEmail) {
            color = users[i].color;
        }
    }

    // 

    kitten.innerHTML = "<p style= color:" + color + ">" + userEmail + " Kitten " + kittenImages.length + ": " + img.src + "</p>";
    array.appendChild(kitten);
    array.appendChild(picture);
    array.appendChild(timeStamp);
    timeStamp.innerText = date;
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
save.addEventListener("click", () => ValidateEmail(textField, saveKitten, invalidEmail));