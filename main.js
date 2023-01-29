const popup = document.querySelector(".popup"),
  wifiIcon = document.querySelector(".icon i"),
  popupTitle = document.querySelector(".popup .title"),
  popupDesc = document.querySelector(".desc"),
  reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const chechConnection = async () => { // checkning the connection status 
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
    console.log(response);
  } catch (error) {
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    // If  the connection is true(Online),update icon,title and description accordingly
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerHTML = "Restored Connection";
    popupDesc.innerHTML =
      "Your device is now successfully connected to the internet.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  //If the connection is false(Offline),update icon,title and description accordingly
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerHTML = "Lost Connection";
  popupDesc.innerHTML =
    "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) chechConnection();
    popup.querySelector(".desc b").innerHTML = timer;
  }, 1000);
};

setInterval(() => isOnline && chechConnection(), 3000);
reconnectBtn.addEventListener("click", chechConnection);
