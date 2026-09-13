function talk() {
  var know = {
    "hi": "Welcome to APDCL chat bot services.",
    "hello": "Welcome to APDCL chat bot services.",
    "hey": "Welcome to APDCL chat bot services.",
  }
  if (inputText.value.toLowerCase() in know && inputText.value!="") {
    appendChats(inputText.value, 'user');
    appendChats(know[inputText.value.toLowerCase()], 'bot');
    appendChats("Enter your Consumer ID", 'bot')
    botInitiated = true;
    inputSendButtton.onclick = getConsumerNo;
    inputText.value = "";
  } 
  else if(inputText.value!=""){
    appendChats(inputText.value, 'user');
    appendChats("Sorry I didn't understand...", 'bot')
    appendChats("Say Hi", 'bot')
    inputText.value = "";
  }
  else{
    appendChats("Please type something in the input field...", 'bot')
    appendChats("Try saying Hi", 'bot')
    inputText.value = "";
  }
  scrollbar.scrollTop = scrollbar.scrollHeight;
}