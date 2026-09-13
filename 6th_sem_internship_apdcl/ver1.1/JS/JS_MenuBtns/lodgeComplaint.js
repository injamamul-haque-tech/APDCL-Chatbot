function getCurrentDate() {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return formattedDate;
}


function lodge_complaint() {
    if (inputText.value == "") {
        appendChats("Complaint cannot be empty", "bot")
        appendChats('If you want to cancel the complaint please click on the button below or type "bye" in the input field', "bot");
    }
    else if (inputText.value.toLowerCase() == "bye") {
        appendChats(inputText.value, "user")
        goBackBtn.style.display = "none";
        menuBtnOptions.style.display = "block";
        inputSendButtton.disabled = true;
    }
    else {
        appendChats(inputText.value, 'user');
        lodgeComplaint(inputText.value, consumer_number,getCurrentDate());
        inputSendButtton.disabled = true;
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
    inputText.value = "";
}

function lodgeComplaint(complaint, consumer_num,date) {
    menuBtnOptions.style.display = "none";
    fetch(`http://127.0.0.1:5000/users?button=lodge_complaint&consumer_number=${consumer_num}&complaint=${complaint}&date=${date}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                appendChats("Your complaint has been registered succesfully", "bot");
                appendChats("<p><b>YOUR COMPLAINT NUMBER IS: </b>"+decodedData.complaint_number+"<br>We will try to resolve the problem as soon as possible</p>", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight;
                setTimeout(() => {
                    menuBtnOptions.style.display = "block";
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 1200);
            }
        })
        .catch(() => {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
    scrollbar.scrollTop = scrollbar.scrollHeight;
}