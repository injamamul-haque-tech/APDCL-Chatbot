function getSelectedValue() {
    const user_details = document.querySelector('.user-details');
    const consumer_number = select.value;
    console.log(consumer_number)

    if (consumer_number == "") {
        user_details.innerHTML = ''
        document.getElementById('chart_div').style.display = 'none'
        user_details.innerHTML = '<p>Select a consumer number from the option</p>'
    }
    else{
        user_details.innerHTML = ''
        document.getElementById('chart_div').style.display = 'block'
        getUserDetails(consumer_number,user_details);
    }
}


function getUserDetails(consumer_number,user_details){
    fetch(`http://127.0.0.1:5000/users?button=graph&consumer_number=${consumer_number}`)
    .then((response) => response.json())
    .then((decodedData) => {
        if (decodedData.msg == "success") {
            console.log(decodedData)
            user_details.innerHTML = `<h2 class="consumer_head">CONSUMER NUMBER: `+consumer_number+`</h2><div class="row"><table><tr><td><b>NAME</b></td><td class="b-separator"><b>:</b></td><td>`+decodedData.name+`</td><td><b>MOBILE NUMBER</b></td><td class="b-separator"><b>:</b></td><td>`+decodedData.mobile_number+`</td></tr><tr><td><b>METER NUMBER</b></td><td class="b-separator"><b>:</b></td><td>`+decodedData.meter_number+`</td><td><b>ADDRESS</b></td><td class="b-separator"><b>:</b></td><td>`+decodedData.address+`</td></tr><tr><td><b>CONNECTION TYPE</b></td><td class="b-separator"><b>:</b></td><td>`+(decodedData.user_connection_type.charAt(0).toUpperCase()+ decodedData.user_connection_type.slice(1))+`</td><td><b>CONNECTED LOAD</b></td><td class="b-separator"><b>:</b></td><td>`+decodedData.connected_load+` kW</td></tr></table></div>`
            drawChart(decodedData.recharge_btn,decodedData.postpaid_bill_btn,decodedData.prepaid_bill_btn,decodedData.tips_btn,decodedData.update_mobile_number_btn,decodedData.lodge_complaint_btn);
        }
    })
    .catch(() => {
            user_details.innerHTML = "<p>There was a server error<br>Try again later</p>"
        });
}