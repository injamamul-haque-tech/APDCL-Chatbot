var menuBtnOptions = document.querySelector(".menuBtnOptions");
var yes_noBtn = document.querySelector(".yes_noOptions");
const no_btn = document.getElementById("no");
const yes_btn = document.getElementById("yes");
let consumer_number
let user_connection_type
let isDataPresent

async function getConsumerNo() {
    if (botInitiated == true && parseInt(inputText.value)) {
        appendChats(inputText.value, 'user');
        consumer_number = inputText.value;

        await checkConsumerNumber(consumer_number)

        if (isDataPresent == true) {
            inputSendButtton.onclick = otpVerification
            appendChats("Enter the OTP", 'bot')
            inputText.value = "";
        }
        else {
            appendChats("There is no data for the given Consumer ID :(", 'bot');
            appendChats("Enter your Consumer ID", 'bot');
            inputText.value = "";
        }

    }
    else if (botInitiated == true && !parseInt(inputText.value) && inputText.value != "") {
        appendChats(inputText.value, 'user');
        appendChats("Try again...", 'bot');
        appendChats("Enter your Consumer ID", 'bot');
        inputText.value = "";
    }
    else {
        appendChats("Try typing something...", 'bot');
        appendChats("Enter your Consumer ID", 'bot');
        inputText.value = "";
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
}

function handleNoButton() {
    if (msg.lastChild) {
        msg.removeChild(msg.lastChild);
    }
    yes_noBtn.style.display = "none";
    appendChats("Enter your Consumer ID", 'bot');
    inputSendButtton.disabled = false;
    inputSendButtton.onclick = getConsumerNo;
    inputText.value = "";
}

function handleYesButton() {
    if (msg.lastChild) {
        msg.removeChild(msg.lastChild);
    }
    yes_noBtn.style.display = "none";
    getDetails();
    scrollbar.scrollTop = scrollbar.scrollHeight;
}

function getDbData(inpTxt) {
    fetch(`http://127.0.0.1:5000/users?button=get_consumer_number&consumer_number=${inpTxt}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                isDataPresent = true;
                user_connection_type = decodedData.user_connection_type;

                appendChats("<table><tr><td><b>NAME</b></td><td><b>:<b></td><td>" + decodedData.name + "</td></tr><tr><td><b>MOBILE NUMBER</b></td><td><b>:<b></td><td>" + decodedData.mobile_number + "</td></tr><tr><td><b>ADDRESS</b></td><td><b>:<b></td><td>" + decodedData.address + "</td></tr><tr><td><b>METER NUMBER</b></td><td><b>:<b></td><td>" + decodedData.meter_number + "</td></tr><tr><td><b>CONNECTED LOAD</b></td><td><b>:<b></td><td>" + decodedData.connected_load + " kW</td></tr><tr><td><b>CONNECTION TYPE</b></td><td><b>:<b></td><td>" + (user_connection_type.charAt(0).toUpperCase() + user_connection_type.slice(1)) + "</td></tr></table>", 'bot');
                appendChats("Are the above details correct?", 'bot');
                inputSendButtton.disabled = true;
                yes_noBtn.style.display = "block";

                no_btn.addEventListener("click", handleNoButton);
                yes_btn.addEventListener("click", handleYesButton);

                scrollbar.scrollTop = scrollbar.scrollHeight;
            }

            else {
                isDataPresent = false;
                appendChats("There is no data for the given Consumer ID :(", 'bot');
                getConsumerNo();
            }
        })
        .catch(() => {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
}

async function checkConsumerNumber(consumer_number) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/users?button=get_consumer_number&consumer_number=${consumer_number}`);
        const decodedData = await response.json();

        if (decodedData.msg == "success") {
            console.log(decodedData)
            isDataPresent = true;
        }

        else if(decodedData.msg == 'error'){
            console.log(decodedData)
            isDataPresent = false;
        }
    }
    catch (error) {
        appendChats("There was a server error :(", 'bot');
        appendChats("Try again later", 'bot');
        scrollbar.scrollTop = scrollbar.scrollHeight;
        inputSendButtton.disabled = true;
        inputSendButtton.style.opacity = 0.5;
    };
}
