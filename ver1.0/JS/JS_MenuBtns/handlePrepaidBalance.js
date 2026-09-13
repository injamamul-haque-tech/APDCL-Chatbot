function handlePrepaidBalance() {
    menuBtnOptions.style.display = "none";
    getPrepaidBalance(consumer_number);
}

function getPrepaidBalance(consumer_num) {
    $.ajax({
        url: 'PHP/get_prepaid_balance.php',
        method: 'POST',
        data: { consumer_num: consumer_num },
        success: function (response) {
            var decodedData = JSON.parse(response)
            appendChats("Show my prepaid balance", "user");
            if (decodedData.status != "no_bill") {
                let balance = parseInt(decodedData.amt_paid) - parseInt(decodedData.due_amount)
                appendChats("<p>Your current balance is <b>Rs." + balance+"</b></p>", "bot");
                if(balance<0){
                    let mon = month(decodedData.due_date.split('-')[1]);
                    let date = decodedData.due_date.split('-')[2]+" "+mon+', '+decodedData.due_date.split('-')[0];
                    appendChats("Please pay the outstanding amount on or before "+date+" to avoid discontinuation of your electric connection", "bot");
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }
            else{
                appendChats("No bills found till date", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);
        },
    });
    scrollbar.scrollTop = scrollbar.scrollHeight
}

function month(mm){
    if(mm == '01')
        return "Jan";
    else if(mm == '02')
        return "Feb";
    else if(mm == '03')
        return "Mar";
    else if(mm == '04')
        return "Apr";
    else if(mm == '05')
        return "May";
    else if(mm == '06')
        return "Jun";
    else if(mm == '07')
        return "Jul";
    else if(mm == '08')
        return "Aug";
    else if(mm == '09')
        return "Sept";
    else if(mm == '10')
        return "Oct";
    else if(mm == '11')
        return "Nov";
    else 
        return "Dec";
}