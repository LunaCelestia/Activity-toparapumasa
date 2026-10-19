
const openLetterButton = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const showSurpriseButton = document.getElementById("showSurprise");

const passwordSection = document.getElementById("passwordSection");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const secondClue = document.getElementById("secondClue");

const surpriseSection = document.getElementById("surpriseSection");
const readAgainButton = document.getElementById("readAgain");
const trashThisButton = document.getElementById("trashThis");
const trashReveal = document.getElementById("trashReveal");
const undoTrashButton = document.getElementById("undoTrash");

// LETTER REVEAL ELEMENTS
const letterContent = document.querySelector(
  "#letterSection .letter-content"
);
const continueWrap = document.querySelector(
  "#letterSection .continue-wrap"
);

const letterParagraphs = Array.from(
  letterContent.querySelectorAll(":scope > p")
);

let revealedCount = 1;

// CREATE THE READING CONTROLS
const revealControls = document.createElement("div");
revealControls.className = "letter-reveal-controls";

const revealHint = document.createElement("p");
revealHint.className = "letter-reveal-hint";
revealHint.textContent = "One paragraph at a time. ♡";

// READING PROGRESS LABEL
const revealProgressLabel = document.createElement("p");
revealProgressLabel.className = "letter-progress-label";

// READING PROGRESS BAR
const revealProgressTrack = document.createElement("div");
revealProgressTrack.className = "letter-progress-track";
revealProgressTrack.setAttribute("role", "progressbar");
revealProgressTrack.setAttribute(
  "aria-label",
  "Letter reading progress"
);
revealProgressTrack.setAttribute("aria-valuemin", "0");
revealProgressTrack.setAttribute("aria-valuemax", "100");

const revealProgressFill = document.createElement("div");
revealProgressFill.className = "letter-progress-fill";

revealProgressTrack.appendChild(revealProgressFill);

// CONTINUE READING BUTTON
const revealNextButton = document.createElement("button");
revealNextButton.className = "primary-button";
revealNextButton.id = "revealNext";
revealNextButton.type = "button";
revealNextButton.textContent = "Continue reading →";

revealControls.append(
  revealHint,
  revealProgressLabel,
  revealProgressTrack,
  revealNextButton
);

letterContent.insertAdjacentElement("afterend", revealControls);

// UPDATE READING PROGRESS
function updateReadingProgress() {
  const total = letterParagraphs.length;

  const percentage = total > 0
    ? Math.round((revealedCount / total) * 100)
    : 0;

  revealProgressLabel.textContent =
    `${revealedCount} of ${total} paragraphs revealed`;

  revealProgressFill.style.width = `${percentage}%`;

  revealProgressTrack.setAttribute(
    "aria-valuenow",
    String(percentage)
  );
}

// RESET THE LETTER TO ITS FIRST PARAGRAPH
function resetLetterReveal() {
  revealedCount = Math.min(1, letterParagraphs.length);

  letterParagraphs.forEach((paragraph, index) => {
    paragraph.classList.remove("reveal-in");
    paragraph.classList.toggle(
      "reveal-hidden",
      index >= revealedCount
    );
  });

  updateReadingProgress();

  revealControls.classList.remove("hidden");
  revealNextButton.textContent = "Continue reading →";
  revealHint.textContent = "One paragraph at a time. ♡";

  continueWrap.classList.add("hidden");
}

// REVEAL SIX PARAGRAPHS PER CLICK
revealNextButton.addEventListener("click", () => {
  const previousCount = revealedCount;

  const nextCount = Math.min(
    revealedCount + 6,
    letterParagraphs.length
  );

  for (let i = previousCount; i < nextCount; i++) {
    const paragraph = letterParagraphs[i];

    paragraph.classList.remove("reveal-hidden");
    paragraph.classList.remove("reveal-in");

    void paragraph.offsetWidth;

    paragraph.classList.add("reveal-in");
  }

  revealedCount = nextCount;
  updateReadingProgress();

  if (revealedCount >= letterParagraphs.length) {
    revealControls.classList.add("hidden");
    continueWrap.classList.remove("hidden");

    continueWrap.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    revealHint.textContent =
      "A little more of the letter... ♡";

    letterParagraphs[revealedCount - 1].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});

// INITIALIZE THE LETTER
resetLetterReveal();

// OPEN THE ENVELOPE
openLetterButton.addEventListener("click", () => {
  openLetterButton.classList.add("is-open");
  openLetterButton.setAttribute(
    "aria-label",
    "Letter opened"
  );

  letterSection.classList.remove("hidden");

  window.setTimeout(() => {
    letterSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 300);
});

// OPEN THE PASSWORD SCREEN
showSurpriseButton.addEventListener("click", () => {
  passwordSection.classList.remove("hidden");

  passwordSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  passwordInput.focus();
});

// CHECK THE PASSWORD
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const password = passwordInput.value.trim();

  if (password.toLowerCase() === "hannah") {
    passwordError.classList.add("hidden");
    secondClue.classList.add("hidden");
    passwordSection.classList.add("hidden");
    surpriseSection.classList.remove("hidden");
    trashReveal.classList.add("hidden");

    passwordInput.value = "";

    surpriseSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    passwordError.classList.remove("hidden");
    secondClue.classList.remove("hidden");

    passwordInput.value = "";
    passwordInput.focus();
  }
});

// READ AGAIN
readAgainButton.addEventListener("click", () => {
  trashReveal.classList.add("hidden");
  surpriseSection.classList.add("hidden");
  passwordSection.classList.add("hidden");
  letterSection.classList.remove("hidden");

  resetLetterReveal();

  letterSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// TRASH THIS: SHOW THE JOKE
trashThisButton.addEventListener("click", () => {
  trashReveal.classList.remove("hidden");

  trashReveal.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// UNDO TRASH
undoTrashButton.addEventListener("click", () => {
  trashReveal.classList.add("hidden");

  surpriseSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
