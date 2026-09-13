function handleRechargeDetails() {
    menuBtnOptions.style.display = "none";
    getRechargeDetails(consumer_number);
}

function getRechargeDetails(consumer_num) {
    $.ajax({
        url: 'PHP/get_recharge_details.php',
        method: 'POST',
        data: { consumer_num: consumer_num },
        success: function (response) {
            var decodedData = JSON.parse(response)
            appendChats("Show my last recharge details", "user");
            if (decodedData.status != "no_bill") {
                due_mon = month(decodedData.due_date.split('-')[1]);
                due_date = decodedData.due_date.split('-')[2] + " " + due_mon + ', ' + decodedData.due_date.split('-')[0];
                bill_mon = month(decodedData.bill_date.split('-')[1]);
                bill_date = decodedData.bill_date.split('-')[2] + " " + bill_mon + ', ' + decodedData.bill_date.split('-')[0];
                appendChats("<table><tr><td><b>BILL NUMBER</b></td><td><b>:<b></td><td>"+decodedData.bill_number+"</td></tr><tr><td><b>BILL DATE</b></td><td><b>:<b></td><td>"+bill_date+"</td></tr><tr><td><b>AMOUNT PAID</b></td><td><b>:<b></td><td> Rs."+decodedData.amount_paid+"</td></tr><tr><td><b>DUE AMOUNT</b></td><td><b>:<b></td><td> Rs."+decodedData.due_amount+"</td></tr><tr><td><b>DUE DATE</b></td><td><b>:<b></td><td>"+due_date+"</td></tr><tr><td><b>TRANSACTION MODE</b></td><td><b>:<b></td><td>"+(decodedData.transaction_mode.charAt(0).toUpperCase() + decodedData.transaction_mode.slice(1))+"</td></tr></table>", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight
            }
            else{
                appendChats("No recharge history found till date", "bot");
                scrollbar.scrollTop = scrollbar.scrollHeight
            }
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);
        },
    });
    scrollbar.scrollTop = scrollbar.scrollHeight
}

