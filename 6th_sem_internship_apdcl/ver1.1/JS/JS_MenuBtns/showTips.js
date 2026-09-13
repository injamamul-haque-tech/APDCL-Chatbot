var min = 0;
var max = 9;
var randomNumber = Math.floor(Math.random() * 10);
function showTips() {
    menuBtnOptions.style.display = "none";
    getTip(randomNumber,consumer_number);
    randomNumber = (randomNumber + 1) % max;
}

function getTip(tip_id,consumer_num) {
    fetch(`http://127.0.0.1:5000/users?button=get_tips&tip_id=${tip_id}&consumer_number=${consumer_num}`)
        .then((response) => response.json())
        .then((decodedData) => {
            if (decodedData.msg == "success") {
                appendChats("Send me an energy efficiency tip", "user");
                appendChats(decodedData.tip_details, "bot");
                setTimeout(() => {
                    menuBtnOptions.style.display = "block";
                    scrollbar.scrollTop = scrollbar.scrollHeight;
                }, 1200);
                scrollbar.scrollTop = scrollbar.scrollHeight;
            }

        })
        .catch(() => {
            appendChats("There was a server error :(", 'bot');
            appendChats("Try again later", 'bot');
            scrollbar.scrollTop = scrollbar.scrollHeight;
            inputSendButtton.disabled = true;
            inputSendButtton.style.opacity = 0.5;
        });
}