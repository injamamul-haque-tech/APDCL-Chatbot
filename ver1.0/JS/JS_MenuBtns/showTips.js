var min = 0;
var max = 9;
var randomNumber = Math.floor(Math.random() * 10);
function showTips() {
    menuBtnOptions.style.display = "none";
    getTip(randomNumber);
    randomNumber = (randomNumber + 1) % max;
}

function getTip(inpTxt) {
    $.ajax({
        url: 'PHP/get_tips.php',
        method: 'POST',
        data: { tips: inpTxt },
        success: function (response) {
            var decodedData = JSON.parse(response)
            appendChats("Send me an energy efficiency tip", "user");
            appendChats(decodedData.tip_details, "bot");
            setTimeout(() => {
                menuBtnOptions.style.display = "block";
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }, 1200);
            scrollbar.scrollTop = scrollbar.scrollHeight;
        },
    });
    scrollbar.scrollTop = scrollbar.scrollHeight
}