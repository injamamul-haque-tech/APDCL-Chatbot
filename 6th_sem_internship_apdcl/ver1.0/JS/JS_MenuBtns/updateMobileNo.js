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
    else if (parseInt(inputText.value)) {
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
    $.ajax({
        url: 'PHP/mobile_no_update.php',
        method: 'POST',
        data: {
            mob_num: inpTxt,
            consumer_num: consumer_num
        },
        success: function (response) {
            var decodedData = JSON.parse(response);
            goBackBtn.style.display = "none";
            appendChats("Your mobile number has been updated succesfully", "bot");
            appendChats("<table><tr><td><b>NAME</b></td><td><b>:<b></td><td>"+decodedData.name+"</td></tr><tr><td><b>MOBILE NUMBER</b></td><td><b>:<b></td><td>"+decodedData.mob_num+"</td></tr></table>", "bot");
            scrollbar.scrollTop = scrollbar.scrollHeight;
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);

        },
    });
    scrollbar.scrollTop = scrollbar.scrollHeight;
}

