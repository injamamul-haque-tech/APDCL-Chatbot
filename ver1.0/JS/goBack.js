function goBack() {
    appendChats("Bye",'user');
    goBackBtn.style.display = "none";
    menuBtnOptions.style.display = "block";
    scrollbar.scrollTop = scrollbar.scrollHeight;
}