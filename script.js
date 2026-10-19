
const openLetterButton = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");

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

const letterContent = document.querySelector(
  "#letterSection .letter-content"
);

const letterEnding = document.getElementById("letterEnding");
const showLastThing = document.getElementById("showLastThing");

let letterRevealTimer = null;
let endingTimer = null;

let fullLetterRevealed = false;
let endingAlreadyShown = false;

let letterObserver = null;
let finalLetterObserver = null;

let teaser = null;
let realLetter = null;

// =========================================
// CREATE THE LETTER TEASER
// =========================================

if (letterContent) {
  teaser = document.createElement("div");
  teaser.id = "fakeLetter";
  teaser.className = "letter-teaser";

  const teaserGreeting = document.createElement("p");
  teaserGreeting.textContent = "Dear Nay,";

  const teaserMessage = document.createElement("p");
  teaserMessage.textContent = "Thank you po sa";

  teaser.append(teaserGreeting, teaserMessage);

  realLetter = document.createElement("div");
  realLetter.id = "realLetter";
  realLetter.className = "hidden";

  // Move the original letter into its wrapper.
  while (letterContent.firstChild) {
    realLetter.appendChild(letterContent.firstChild);
  }

  letterContent.append(teaser, realLetter);
}

// =========================================
// REVEAL LETTER PARAGRAPHS ON SCROLL
// =========================================

function startScrollReveal() {
  if (!realLetter || !fullLetterRevealed) return;

  const paragraphs = realLetter.querySelectorAll(":scope > p");

  if (!("IntersectionObserver" in window)) {
    paragraphs.forEach((paragraph) => {
      paragraph.classList.add("revealed");
    });
    return;
  }

  if (letterObserver) {
    letterObserver.disconnect();
  }

  letterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  paragraphs.forEach((paragraph) => {
    if (!paragraph.classList.contains("revealed")) {
      letterObserver.observe(paragraph);
    }
  });
}

// =========================================
// HIDE THE LETTER ENDING INITIALLY
// =========================================

if (letterEnding) {
  letterEnding.classList.add("hidden");
  letterEnding.classList.remove("last-thing-visible");
}

// =========================================
// WAIT UNTIL THE LAST PARAGRAPH
// =========================================

function setupFinalLetterSurprise() {
  if (!realLetter || !letterEnding || endingAlreadyShown) return;

  const paragraphs = realLetter.querySelectorAll(":scope > p");
  const lastParagraph = paragraphs[paragraphs.length - 1];

  if (!lastParagraph) return;

  if (!("IntersectionObserver" in window)) {
    scheduleLetterEnding();
    return;
  }

  if (finalLetterObserver) {
    finalLetterObserver.disconnect();
  }

  finalLetterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          // Start the extra 10-second wait.
          scheduleLetterEnding();
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  finalLetterObserver.observe(lastParagraph);
}

// =========================================
// SHOW BOTH ENDING MESSAGES AFTER 10 SECONDS
// =========================================

function scheduleLetterEnding() {
  if (endingTimer !== null || endingAlreadyShown) return;

  endingTimer = window.setTimeout(() => {
    endingAlreadyShown = true;

    if (letterEnding) {
      letterEnding.classList.remove("hidden");

      requestAnimationFrame(() => {
        letterEnding.classList.add("last-thing-visible");
      });
    }

    endingTimer = null;
  }, 10000);
}

// =========================================
// REVEAL THE REAL LETTER AFTER 10 SECONDS
// =========================================

function startLetterCountdown() {
  if (fullLetterRevealed || letterRevealTimer !== null) return;

  letterRevealTimer = window.setTimeout(() => {
    fullLetterRevealed = true;

    if (teaser) {
      teaser.classList.add("teaser-fading");
    }

    window.setTimeout(() => {
      if (teaser) {
        teaser.classList.add("hidden");
      }

      if (realLetter) {
        realLetter.classList.remove("hidden");
        realLetter.classList.add("letter-fading-in");
      }

      startScrollReveal();
      setupFinalLetterSurprise();

      letterRevealTimer = null;
    }, 450);
  }, 10000);
}

// =========================================
// OPEN THE ENVELOPE
// =========================================

if (openLetterButton) {
  openLetterButton.addEventListener("click", () => {
    openLetterButton.classList.add("is-open");
    openLetterButton.setAttribute("aria-label", "Letter opened");

    letterSection.classList.remove("hidden");

    startLetterCountdown();

    window.setTimeout(() => {
      letterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 300);
  });
}

// =========================================
// OPEN THE PASSWORD SCREEN
// =========================================

function openPasswordScreen() {
  if (!passwordSection) return;

  passwordSection.classList.remove("hidden");

  passwordSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  if (passwordInput) {
    passwordInput.focus();
  }
}

// =========================================
// CLICK "ONE LAST THING"
// =========================================

if (showLastThing) {
  showLastThing.addEventListener("click", openPasswordScreen);
}

// =========================================
// CHECK THE PASSWORD
// =========================================

if (passwordForm) {
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
}

// =========================================
// READ AGAIN
// =========================================

if (readAgainButton) {
  readAgainButton.addEventListener("click", () => {
    trashReveal.classList.add("hidden");
    surpriseSection.classList.add("hidden");
    passwordSection.classList.add("hidden");

    letterSection.classList.remove("hidden");

    letterSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

// =========================================
// TRASH THIS
// =========================================

if (trashThisButton) {
  trashThisButton.addEventListener("click", () => {
    trashReveal.classList.remove("hidden");

    trashReveal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

// =========================================
// UNDO TRASH
// =========================================

if (undoTrashButton) {
  undoTrashButton.addEventListener("click", () => {
    trashReveal.classList.add("hidden");

    surpriseSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}
