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

// OPEN THE ENVELOPE
openLetterButton.addEventListener("click", () => {
  openLetterButton.classList.add("is-open");
  openLetterButton.setAttribute("aria-label", "Letter opened");

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

// READ AGAIN: RETURN TO THE MAIN LETTER
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

// TRASH THIS: SHOW THE JOKE
trashThisButton.addEventListener("click", () => {
  trashReveal.classList.remove("hidden");

  trashReveal.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// UNDO TRASH: HIDE THE JOKE
undoTrashButton.addEventListener("click", () => {
  trashReveal.classList.add("hidden");

  surpriseSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});


/* AUTOMATIC LETTER REVEAL ON SCROLL */

const letterRevealParagraphs = document.querySelectorAll(
  "#letterSection .letter-content > p"
);

if ("IntersectionObserver" in window) {
  const letterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  letterRevealParagraphs.forEach((paragraph) => {
    letterObserver.observe(paragraph);
  });
} else {
  letterRevealParagraphs.forEach((paragraph) => {
    paragraph.classList.add("revealed");
  });
}
