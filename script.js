const messages = [
  {
    label: "A LITTLE CONFESSION",
    title: "I Have Crush On You!!",
    description: "",
    signature: "with a little courage, ♡"
  },
  {
    label: "A NOTE FOR YOU",
    title: "hey boo",
    description: "it hasn't even been a month, but this, us? i could describe it as something profound.",
    signature: "♡"
  },
  {
    label: "THE LITTLE THINGS",
    title: "You make ordinary days feel special.",
    description: "our little banters and all, laughters and whatnot, everyday. has been nothing but a wonderful bliss. you are a very wonderful person, and i hope you know that, if not then i'll do my best to show you how i see you.",
    signature: "you deserve to know that. ♡"
  },
  {
    label: "IF ONLY DISTANCE WASN'T THERE",
    title: "There's still so much I want to show you.",
    description: "oh how i wish i could be there to court you without restraints, since the distances deprives me of that choice, it doesn't stop me from making this, and so much more. but for the mean time i hope you know that...",
    signature: "even from afar, ♡"
  },
  {
    label: "ONE LAST THING",
    title: "i really like you",
    description: "i hope you do too :)",
    signature: "♡"
  }
];

let currentPage = 0;
const titleEl = document.getElementById("message-title");
const descriptionEl = document.getElementById("message-description");
const labelEl = document.getElementById("page-label");
const signatureEl = document.getElementById("signature");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const dotsEl = document.getElementById("progress-dots");
const countEl = document.getElementById("page-count");
const hintEl = document.getElementById("hint");

function makeLetters(element, text) {
  element.textContent = "";
  if (!text) return;

  // Keep spaces between words while animating individual characters.
  const words = text.split(" ");
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    [...word].forEach((character, index) => {
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = character;
      letter.style.setProperty("--scatter-x", `${Math.round((Math.random() - .5) * 150)}px`);
      letter.style.setProperty("--scatter-y", `${Math.round((Math.random() - .5) * 130)}px`);
      letter.style.setProperty("--scatter-rotate", `${Math.round((Math.random() - .5) * 80)}deg`);
      letter.style.setProperty("--delay", `${Math.min((wordIndex * 2 + index) * 8, 650)}ms`);
      wordSpan.appendChild(letter);
    });
    element.appendChild(wordSpan);
    if (wordIndex < words.length - 1) element.appendChild(document.createTextNode(" "));
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.querySelectorAll(".letter").forEach(letter => letter.classList.add("visible"));
    });
  });
}

function buildDots() {
  dotsEl.textContent = "";
  messages.forEach((message, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to message ${index + 1}`);
    dot.addEventListener("click", () => showPage(index));
    dotsEl.appendChild(dot);
  });
}

function showPage(index) {
  currentPage = Math.max(0, Math.min(index, messages.length - 1));
  const message = messages[currentPage];

  labelEl.textContent = message.label;
  makeLetters(titleEl, message.title);
  makeLetters(descriptionEl, message.description);
  signatureEl.textContent = message.signature;

  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === messages.length - 1;
  countEl.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(messages.length).padStart(2, "0")}`;
  [...dotsEl.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentPage);
    dot.setAttribute("aria-current", dotIndex === currentPage ? "step" : "false");
  });

  hintEl.textContent = currentPage === messages.length - 1
    ? "That’s everything… for now. ♡"
    : "Take your time. There's more…";
}

previousButton.addEventListener("click", () => showPage(currentPage - 1));
nextButton.addEventListener("click", () => showPage(currentPage + 1));

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") showPage(currentPage - 1);
  if (event.key === "ArrowRight") showPage(currentPage + 1);
});

let touchStartX = 0;
document.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
document.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 60) showPage(currentPage + (distance < 0 ? 1 : -1));
}, { passive: true });

buildDots();
showPage(0);
