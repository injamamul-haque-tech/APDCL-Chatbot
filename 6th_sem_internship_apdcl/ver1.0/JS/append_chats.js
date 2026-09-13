const scrollbar = document.querySelector(".msg");
const iconMsgResponse = document.querySelector(".chatbot");
const exitIcon = document.querySelector("#exit");

const msg = document.getElementById("msg");

let inputText = document.querySelector("#userinput");
const inputSendButtton = document.getElementById("send");

var botInitiated = false;

function appendChats(inputTxt, person) {

    var li = document.createElement("li")
    var span = document.createElement("span")
    span.innerHTML = inputTxt
    if (person == 'user') {
        li.className = 'user-msg'
        span.className = 'user-msg-content'
    }
    else {
        li.className = 'bot-msg'
        span.className = 'bot-msg-content'
    }
    // span.appendChild(txt)
    li.appendChild(span)
    msg.appendChild(li)
}