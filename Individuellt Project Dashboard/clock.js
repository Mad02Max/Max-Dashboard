function clock() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;
    const dateTime = hour + ":" + minute;
    document.getElementById("clock").innerHTML = dateTime;
    setTimeout(clock, 1000);
  }
  
  clock();