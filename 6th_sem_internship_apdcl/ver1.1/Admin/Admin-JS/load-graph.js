const select = document.getElementById('users');
select.addEventListener('change', () => {
    getSelectedValue();
});

google.charts.load('current', { packages: ['corechart', 'bar'] });

function drawChart(recharge_btn, postpaid_bill_btn, prepaid_bill_btn, tips_btn, update_mobile_number_btn, lodge_complaint_btn) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Buttons pressed');
    data.addColumn('number', 'Number of times button pressed');

    var options = {
        title: 'User interactions with the chatbot',
        hAxis: {
            title: 'Buttons',
        },
        vAxis: {
            title: 'Frequency of interactions'
        }
    };

    data.addRows([
        ['Prepaid Balance', recharge_btn],
        ['Postpaid Bill', postpaid_bill_btn],
        ['Prepaid Bill', prepaid_bill_btn],
        ['Energy Efficiency Tips', tips_btn],
        ['Mobile Number Update', update_mobile_number_btn],
        ['Lodge Complaint', lodge_complaint_btn],
    ]);
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);

}