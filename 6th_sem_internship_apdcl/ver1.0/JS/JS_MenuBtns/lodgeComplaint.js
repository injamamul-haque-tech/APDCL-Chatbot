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
    else{
        appendChats(inputText.value,'user');
        lodgeComplaint(inputText.value,consumer_number);
        inputSendButtton.disabled = true;
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
    inputText.value = "";
}

function lodgeComplaint(inpTxt, consumer_num) {
    menuBtnOptions.style.display = "none";
    $.ajax({
        url: 'PHP/lodge_complaint.php',
        method: 'POST',
        data: {
            complaint: inpTxt,
            consumer_num: consumer_num
        },
        success: function (response) {
            if(response == 'success'){
                goBackBtn.style.display = "none";
                appendChats("Your complaint has been registered succesfully","bot");
                appendChats("We will try to resolve the problem as soon as possible","bot");
                scrollbar.scrollTop = scrollbar.scrollHeight;
                setTimeout(() => {
                    menuBtnOptions.style.display = "block";
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 1200);
            }
        },
    });
    scrollbar.scrollTop = scrollbar.scrollHeight;
}