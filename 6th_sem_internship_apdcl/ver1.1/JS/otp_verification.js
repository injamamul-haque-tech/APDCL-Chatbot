let numRetries = 3;
const userOtp = 54321;

function handleIncorrectOTP() {
    appendChats("<p>Entered OTP is wrong<br>(<b>" + numRetries + "</b> tries left)</p>", 'bot');
    if (numRetries != 0) {
        inputText.value = "";
        appendChats("Enter the OTP again", 'bot');
        numRetries--;
    } else {
        appendChats('<p>Oops!! You ran out of attempts <i class="fa-regular fa-face-frown"></i><br>Try after some time</p>',"bot");
        scrollbar.scrollTop = scrollbar.scrollHeight;
        inputSendButtton.disabled = true;
        inputSendButtton.style.opacity = 0.5;
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
}
function otpVerification() {
    let userEnteredOtp = inputText.value;
    
    if (userEnteredOtp == "") {
        appendChats("OTP cannot be empty", 'bot');
        appendChats("Enter the OTP again", 'bot');
    }

    else {
        appendChats(userEnteredOtp, 'user')
        scrollbar.scrollTop = scrollbar.scrollHeight;

        if (userOtp === parseInt(userEnteredOtp)) {
            numRetries = 3;
            getDbData(consumer_number);
            inputText.value = "";
            inputSendButtton.disabled = true
        }
        else {
            handleIncorrectOTP();
        }
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
}