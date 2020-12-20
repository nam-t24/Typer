// Powered by Quotable
// https://github.com/lukePeavey/quotable

//DOM Element
const typingText = document.getElementById("displayQuote");

async function getQuote() {
  //getting quote content
  const loadQuote = await fetch("https://api.quotable.io/random");
  const data1 = await loadQuote.json();

  //assign quote content to DOM

  const text = data1.content;

  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingText.appendChild(span);
    return span;
  });

  let cursorIndex = 0;
  let cursorCharacter = characters[cursorIndex];
  cursorCharacter.classList.add("cursor");
  let startTime = null;
  let endTime = null;

  const keyListener = document.addEventListener("keydown", ({ key }) => {
    if (!startTime) {
      startTime = new Date();
    }
    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("correct");
      cursorCharacter = characters[++cursorIndex];
    }
    if (cursorIndex >= characters.length) {
      endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const numberOfWords = text.split(" ").Length;
      const wps = numberOfWords / seconds;
      const wpm = wps * 60.0;
      document.getElementById("wordspm").innerText = `wpm = ${wpm}`;
      document.removeEventListener("keydown", keyListener);
      return;
    }
    cursorCharacter.classList.add("cursor");
  });
}

getQuote();

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const button = document.querySelector("#load");
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");

  async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    // Update DOM elements
    quote.textContent = data.content;
    cite.textContent = data.author;
  }

  // Attach an event listener to the `button`
  button.addEventListener("click", updateQuote);

  // call updateQuote once when page loads
  updateQuote();
});
