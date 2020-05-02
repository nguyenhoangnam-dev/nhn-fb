let notifi = document.getElementById("notifi");
let notifiBox = document.getElementById("notifi-box");

notifi.addEventListener("click", (e) => {
  if (notifiBox.classList.contains("display-none")) {
    notifiBox.classList.remove("display-none");
  } else {
    notifiBox.classList.add("display-none");
  }
});
