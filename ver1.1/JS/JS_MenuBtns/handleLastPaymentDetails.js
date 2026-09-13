function handleLastPaymentDetails() {
    menuBtnOptions.style.display = "none";
    getPaymentDetails(consumer_number);
}

function getPaymentDetails(consumer_num) {
    fetch(`http://127.0.0.1:5000/users?button=get_last_bill_details&consumer_number=${consumer_num}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                let due_date = formatDateWithoutTime(decodedData.due_date)
                let bill_date = formatDateWithoutTime(decodedData.bill_date)
                appendChats("<table><tr><td><b>BILL NUMBER</b></td><td><b>:<b></td><td>" + decodedData.bill_number + "</td></tr><tr><td><b>BILL DATE</b></td><td><b>:<b></td><td>" + bill_date + "</td></tr><tr><td><b>AMOUNT PAID</b></td><td><b>:<b></td><td> Rs." + decodedData.amount_paid + "</td></tr><tr><td><b>DUE AMOUNT</b></td><td><b>:<b></td><td> Rs." + decodedData.due_amount + "</td></tr><tr><td><b>DUE DATE</b></td><td><b>:<b></td><td>" + due_date + "</td></tr><tr><td><b>TRANSACTION MODE</b></td><td><b>:<b></td><td>" + (decodedData.transaction_mode.charAt(0).toUpperCase() + decodedData.transaction_mode.slice(1)) + "</td></tr></table>", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight
            }

            else {
                appendChats("No bills found till date", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight
            }
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);
            scrollbar.scrollTop = scrollbar.scrollHeight
        })
        .catch(() => {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
}
