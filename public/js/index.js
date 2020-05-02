let notifi = document.getElementById("notifi");
let notifiBox = document.getElementById("notifi-box");
let main = document.getElementById("main");

notifi.addEventListener("click", (e) => {
  if (notifiBox.classList.contains("display-none")) {
    notifiBox.classList.remove("display-none");
  } else {
    notifiBox.classList.add("display-none");
  }
});

// main.addEventListener("click", (e) => {
//   if (notifiBox.classList.contains("display-none")) {
//     notifiBox.classList.remove("display-none");
//   }
// });
