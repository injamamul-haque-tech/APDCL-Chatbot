var complaintMenuBtnOptions = document.querySelector(".complaintMenu");
var goBackBtn = document.querySelector(".goBack");
function complaint_details() {
    inputSendButtton.disabled = true;
    complaintMenuBtnOptions.style.display = "block";
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', buttonClickHandler);
        buttons[i].addEventListener('click', buttonClickHandler);
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
}

function buttonClickHandler(event) {
    const selectedButton = event.target;
    const buttonValue = selectedButton.value;

    if (buttonValue === 'voltage_fluctuation') {
        complaintMenuBtnOptions.style.display = "none";
        appendChats("Voltage fluctuation in my electricity connection","user")
        lodgeComplaint("Voltage fluctuation in my electricity connection",consumer_number)
    } 
    else if (buttonValue === 'incorrect_readings') {
        complaintMenuBtnOptions.style.display = "none";
        appendChats("My meter shows Incorrect readings","user")
        lodgeComplaint("My meter shows Incorrect readings",consumer_number)
    } 
    else if (buttonValue === 'payment_error') {
        complaintMenuBtnOptions.style.display = "none";
        appendChats("There was a payment error in my last payment","user")
        lodgeComplaint("There was a payment error in my last payment",consumer_number)
        console.log("payment");
    } 
    else if (buttonValue === 'others') {
        if (msg.lastChild) {
            msg.removeChild(msg.lastChild);
        }
        appendChats("Please enter your complaint", "bot");
        complaintMenuBtnOptions.style.display = "none";
        goBackBtn.style.display = "block";
        goBackBtn.removeEventListener("click", goBack);
        goBackBtn.addEventListener("click", goBack);
        inputSendButtton.disabled = false;
        inputSendButtton.onclick = lodge_complaint;
    } 
    else if (buttonValue === 'back') {
        complaintMenuBtnOptions.style.display = "none";
        menuBtnOptions.style.display = "block";
        inputSendButtton.disabled = true;
        scrollbar.scrollTop = scrollbar.scrollHeight;
    }
}