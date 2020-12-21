// Powered by Quotable
// https://github.com/lukePeavey/quotable

//DOM Element
const typingText = document.getElementById("displayQuote");
const stats = document.getElementById("wordspm");

//typing section
async function getQuote() {
  //getting quote content
  const loadQuote = await fetch("https://api.quotable.io/random");
  const data1 = await loadQuote.json();

  //assign quote content to DOM
  typingText.innerHTML = "";
  stats.innerHTML = "wpm:";
  const text = data1.content;

  //splits text into array of each character
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

  //typing function
  const keyListener = document.addEventListener("keydown", ({ key }) => {
    if (!startTime) {
      startTime = new Date();
    }
    //typing action
    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("correct");
      cursorCharacter = characters[++cursorIndex];
    }
    //stat calculation
    if (cursorIndex >= characters.length) {
      endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;

      //words per minute is calculated by dividing total amount of characters by 5 per minute
      const numberOfWords = characters.length / 5.0;
      const wps = numberOfWords / seconds;
      const wpm = Math.round(100 * (wps * 60.0)) / 100;
      document.getElementById("wordspm").innerText = `wpm: ${wpm}`;
      document.removeEventListener("keydown", keyListener);
      return;
    }
    cursorCharacter.classList.add("cursor");
  });
}
//calls getQuote once when page loads
getQuote();

//quotes card
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

/*Button Themes*/
function themes(sheet) {
  document.getElementById("csspage").setAttribute("href", sheet);
}
