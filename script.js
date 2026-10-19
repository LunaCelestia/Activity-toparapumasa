
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

const oneLastThing = document.getElementById("oneLastThing");
const showLastThing = document.getElementById("showLastThing");

// =========================================
// LETTER TEASER + 10-SECOND AUTOMATIC REVEAL
// =========================================

const letterContent = document.querySelector(
  "#letterSection .letter-content"
);

let letterRevealTimer = null;
let fullLetterRevealed = false;
let letterObserver = null;
let finalLetterObserver = null;

let teaser = null;
let realLetter = null;

// Create the teaser and preserve the original letter.
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

  while (letterContent.firstChild) {
    realLetter.appendChild(letterContent.firstChild);
  }

  letterContent.append(teaser, realLetter);
}

// =========================================
// REVEAL LETTER PARAGRAPHS WHILE SCROLLING
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
// SHOW "ONE LAST THING" AT THE END
// =========================================

function setupFinalLetterSurprise() {
  if (!realLetter || !oneLastThing) return;

  // Find the last paragraph of the real letter.
  const paragraphs = realLetter.querySelectorAll(":scope > p");
  const lastParagraph = paragraphs[paragraphs.length - 1];

  if (!lastParagraph) {
    revealFinalButton();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealFinalButton();
    return;
  }

  if (finalLetterObserver) {
    finalLetterObserver.disconnect();
  }

  finalLetterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealFinalButton();
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  finalLetterObserver.observe(lastParagraph);
}

function revealFinalButton() {
  if (!oneLastThing) return;

  oneLastThing.classList.remove("hidden");
  oneLastThing.style.display = "block";

  requestAnimationFrame(() => {
    oneLastThing.classList.add("last-thing-visible");
  });
}

// =========================================
// START THE 10-SECOND COUNTDOWN
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

if (showSurpriseButton) {
  showSurpriseButton.addEventListener("click", openPasswordScreen);
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
// READ AGAIN: RETURN TO THE LETTER
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
// TRASH THIS: SHOW THE JOKE
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
// UNDO TRASH: HIDE THE JOKE
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

// =========================================
// "ONE LAST THING" CLICK ACTION
// =========================================

if (showLastThing) {
  showLastThing.addEventListener("click", openPasswordScreen);
}
