function updateMobileNo() {
    if (inputText.value == "") {
        appendChats("Mobile number cannot be empty", "bot")
        appendChats("If you want to cancel the updation process please type 'bye' in the input field", "bot");
    }
    else if (inputText.value.toLowerCase() == "bye") {
        appendChats(inputText.value, "user")
        goBackBtn.style.display = "none";
        menuBtnOptions.style.display = "block";
        inputSendButtton.disabled = true;
    }
    else if (inputText.value == parseInt(inputText.value)) {
        appendChats(inputText.value, 'user');
        mob_update(inputText.value, consumer_number);
        inputSendButtton.disabled = true;
    }
    else {
        appendChats(inputText.value, 'user');
        appendChats("Try again", "bot");
        appendChats("Please enter a valid mobile number", "bot");
    }

    scrollbar.scrollTop = scrollbar.scrollHeight;
    inputText.value = "";
}

function mob_update(inpTxt, consumer_num) {
    menuBtnOptions.style.display = "none";
    fetch(`http://127.0.0.1:5000/users?button=update_mobile_number&consumer_number=${consumer_num}&mobile_number=${inpTxt}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                goBackBtn.style.display = "none";
                appendChats("Your mobile number has been updated succesfully", "bot");
                appendChats("<table><tr><td><b>NAME</b></td><td><b>:<b></td><td>" + decodedData.name + "</td></tr><tr><td><b>MOBILE NUMBER</b></td><td><b>:<b></td><td>" + decodedData.mobile_number + "</td></tr></table>", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight;
                setTimeout(() => {
                    menuBtnOptions.style.display = "block";
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 1200);
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }
        })
        .catch(() => {
            goBackBtn.style.display = "none";
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
        scrollbar.scrollTop = scrollbar.scrollHeight;
    }

