function handlePrepaidBalance() {
    menuBtnOptions.style.display = "none";
    getPrepaidBalance(consumer_number);
}
function formatDateWithoutTime(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getPrepaidBalance(consumer_num) {
    fetch(`http://127.0.0.1:5000/users?button=get_prepaid_balance&consumer_number=${consumer_num}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                let balance = parseInt(decodedData.amount_paid) - parseInt(decodedData.due_amount)
                appendChats("<p>Your current balance is <b>Rs." + balance + "</b></p>", "bot");
                if (balance < 0) {
                    let due_date = formatDateWithoutTime(decodedData.due_date)
                    appendChats("Please pay the outstanding amount on or before " + due_date + " to avoid discontinuation of your electric connection", "bot");
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }
            }

            else {
                appendChats("No bills found till date", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);
        })
        .catch(() => {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
}