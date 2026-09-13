var menuBtnOptions = document.querySelector(".menuBtnOptions");
var yes_noBtn = document.querySelector(".yes_noOptions");
const no_btn = document.getElementById("no");
const yes_btn = document.getElementById("yes");
let consumer_number
let user_connection_type

function getConsumerNo() {
    if (botInitiated == true && parseInt(inputText.value)) {
        appendChats(inputText.value, 'user');
        consumer_number = inputText.value;
        getDbData(inputText.value);
        inputText.value = "";
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

function getDbData(inpTxt) {
    $.ajax({
        url: 'PHP/consumer_details.php',
        method: 'POST',
        data: { inputText: inpTxt },
        success: function (response) {
            var decodedData = JSON.parse(response)
            if (decodedData.msg == "success") {
                user_connection_type = decodedData.user_connection_type;

                appendChats("<table><tr><td><b>NAME</b></td><td><b>:<b></td><td>"+decodedData.name+"</td></tr><tr><td><b>MOBILE NUMBER</b></td><td><b>:<b></td><td>"+decodedData.mobile_number+"</td></tr><tr><td><b>ADDRESS</b></td><td><b>:<b></td><td>"+decodedData.address+"</td></tr><tr><td><b>METER NUMBER</b></td><td><b>:<b></td><td>"+decodedData.meter_number+"</td></tr><tr><td><b>CONNECTED LOAD</b></td><td><b>:<b></td><td>"+decodedData.connected_load+" kW</td></tr><tr><td><b>CONNECTION TYPE</b></td><td><b>:<b></td><td>"+(user_connection_type.charAt(0).toUpperCase() + user_connection_type.slice(1))+"</td></tr></table>", 'bot');
                appendChats("Are the above details correct?", 'bot');
                inputSendButtton.disabled = true;
                yes_noBtn.style.display = "block";

                no_btn.addEventListener("click", handleNoButton);
                yes_btn.addEventListener("click", handleYesButton);

                scrollbar.scrollTop = scrollbar.scrollHeight;
            }
            else {
                appendChats("There is no data for the given Consumer ID :(", 'bot');
                getConsumerNo();
            }
        },
        error: function () {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        }
    });
}

function handleNoButton() {
    if (msg.lastChild) {
        msg.removeChild(msg.lastChild);
    }
    yes_noBtn.style.display = "none";
    appendChats("Enter your Consumer ID", 'bot');
    inputSendButtton.disabled = false;
}

function handleYesButton() {
    if (msg.lastChild) {
        msg.removeChild(msg.lastChild);
    }
    yes_noBtn.style.display = "none";
    getDetails();
    scrollbar.scrollTop = scrollbar.scrollHeight;
}