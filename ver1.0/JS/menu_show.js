const buttons = document.getElementsByClassName('option_btns');
function getDetails() {
    menuBtnOptions.style.display = "block";
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            const selectedButton = event.target;
            const buttonValue = selectedButton.value;

            if (buttonValue === 'prepaid_bal') {
                if (user_connection_type == 'prepaid') {
                    handlePrepaidBalance();
                }
                else {
                    menuBtnOptions.style.display = "none";
                    appendChats("Show my prepaid details","user")
                    appendChats("<p>You are a <b>" + (user_connection_type.charAt(0).toUpperCase() + user_connection_type.slice(1)) + "</b> user</p>",'bot');
                    appendChats("Click on 'Last Bill Details' button to check your payment details");
                    setTimeout(() => {
                        menuBtnOptions.style.display = "block";
                        scrollbar.scrollTop = scrollbar.scrollHeight;
                    }, 1200);
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }
            }
            else if (buttonValue === 'last_bill_details') {
                if (user_connection_type == "postpaid") {
                    handleLastPaymentDetails();
                }
                else {
                    menuBtnOptions.style.display = "none";
                    appendChats("Show my last bill details","user")
                    appendChats("<p>You are a <b>" + (user_connection_type.charAt(0).toUpperCase() + user_connection_type.slice(1)) + "</b> user</p>",'bot');
                    appendChats("Click on 'Last Recharge Details' or 'Prepaid Balance' button to check your payment details");
                    setTimeout(() => {
                        menuBtnOptions.style.display = "block";
                        scrollbar.scrollTop = scrollbar.scrollHeight;
                    }, 1200);
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }
            }
            else if (buttonValue === 'last_recharge_details') {
                if (user_connection_type == 'prepaid') {
                    handleRechargeDetails();
                }
                else {
                    menuBtnOptions.style.display = "none";
                    appendChats("Show my last recharge details","user")
                    appendChats("<p>You are a <b>" + (user_connection_type.charAt(0).toUpperCase() + user_connection_type.slice(1)) + "</b> user</p>",'bot');
                    appendChats("Click on 'Last Bill Details' button to check your payment details");
                    setTimeout(() => {
                        menuBtnOptions.style.display = "block";
                        scrollbar.scrollTop = scrollbar.scrollHeight;
                    }, 1200);
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }
            }
            else if (buttonValue === 'mobile_no_update') {
                appendChats("Update my mobile number", "user");
                appendChats("Please enter your new mobile number", "bot");
                goBackBtn.style.display = "block";
                goBackBtn.removeEventListener("click", goBack);
                goBackBtn.addEventListener("click", goBack);
                menuBtnOptions.style.display = "none";
                inputSendButtton.disabled = false;
                inputSendButtton.onclick = updateMobileNo;
            }
            else if (buttonValue === 'tips') {
                showTips();
            }
            else if (buttonValue === 'complaint') {
                appendChats("Lodge a complaint", "user");
                appendChats("Select your complaint", "bot");
                menuBtnOptions.style.display = "none";
                inputSendButtton.disabled = false;
                complaint_details();
            }
        });
    }
    scrollbar.scrollTop = scrollbar.scrollHeight;
}