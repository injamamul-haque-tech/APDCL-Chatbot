const iconResponse = document.querySelector(".chatbot");
const chatDiv = document.querySelector("#chat");
const exit = document.getElementById('exit');
chatDiv.style.display = "none";
var isNodisplay = true;

//Function to hide and show the chat bot.
iconResponse.addEventListener("click", function () {
  if (isNodisplay == true) {
    chatDiv.style.display = "block";
    isNodisplay = false;
    inputSendButtton.disabled = true;
    setTimeout(() => {
      inputSendButtton.disabled = false;
      appendChats("Say Hi",'bot');
    }, 400);
  } else {
    chatDiv.style.display = "none";
    isNodisplay = true;
  }
});
exit.addEventListener('click', function () {
  chatDiv.classList.remove('chat_slide_left')
  chatDiv.classList.add('chat_slide_right')
  isNodisplay = true;
  botInitiated = false;
  inputSendButtton.style.opacity = 1;
  inputSendButtton.disabled = false;
  inputSendButtton.onclick = talk;
  while(msg.firstChild){
    msg.removeChild(msg.firstChild);
  }
  setTimeout(() => {
    chatDiv.style.display = "none";
    chatDiv.classList.remove('chat_slide_right')
    chatDiv.classList.add('chat_slide_left')
    window.location.reload();
  }, 400);
});
