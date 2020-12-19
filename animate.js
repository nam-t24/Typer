const text = document.querySelector(".fancy");
//gets string text of h1
const strText = text.textContent;
//splits title into array
const textArray = strText.split("");
text.textContent = "";

for (let i = 0; i < textArray.length; i++) {
  text.innerHTML += "<span>" + textArray[i] + "</span>";
}

let char = 0,
  timer = setInterval(onTick, 50);

function onTick() {
  const span = text.querySelectorAll("span")[char];
  span.classList.add("fade");
  char++;
  if (char === textArray.length) {
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
  timer = null;
}
