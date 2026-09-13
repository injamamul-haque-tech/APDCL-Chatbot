const login = document.querySelector(".btn")
const error = document.querySelector("#error");
const warning = document.querySelector("#warning");
login.addEventListener("click", function (event) {
    event.preventDefault();
    let adminUsername = document.querySelector("#username").value;
    let adminPassword = document.querySelector("#password").value;

    const username = 'admin';
    const password = '123';

    if (adminUsername == username && adminPassword == password) {
        console.log("Welcome admin");
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
        window.location.href = 'graph.html'
    }
    else if (adminUsername === "" || adminPassword === "") {
        console.log("Input field cannot be empty")
        error.style.visibility = 'hidden';
        warning.style.opacity = 1
        warning.style.visibility = 'visible';
        document.querySelector("#password").value = "";
        setTimeout(() => {
            error.style.visibility = 'hidden';
            warning.style.visibility = 'hidden';
            warning.style.opacity = 0
            error.style.opacity = 0
        }, 3000);
    }
    else {
        warning.style.visibility = 'hidden';
        error.style.opacity = 1
        error.style.visibility = 'visible';
        console.log("Wrong credential entered!");
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
        setTimeout(() => {
            error.style.visibility = 'hidden';
            warning.style.visibility = 'hidden';
            warning.style.opacity = 0
            error.style.opacity = 0
        }, 3000);
    } 
});

// Detect back button click and disable it