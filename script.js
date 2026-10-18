
const openLetterButton = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const showSurpriseButton = document.getElementById("showSurprise");

const passwordSection = document.getElementById("passwordSection");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const secondClue = document.getElementById("secondClue");

const surpriseSection = document.getElementById("surpriseSection");
const backToLetterButton = document.getElementById("backToLetter");
const trashThisButton = document.getElementById("trashThis");
const trashReveal = document.getElementById("trashReveal");
const undoTrashButton = document.getElementById("undoTrash");
const endingActions = document.getElementById("endingActions");


// OPEN THE ENVELOPE
openLetterButton.addEventListener("click", () => {
  const isOpen = openLetterButton.classList.contains("is-open");

  if (!isOpen) {
    openLetterButton.classList.add("is-open");
    openLetterButton.setAttribute("aria-label", "Letter opened");

    window.setTimeout(() => {
      letterSection.classList.remove("hidden");

      letterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 700);
  } else {
    letterSection.classList.remove("hidden");

    letterSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
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


// RETURN TO THE LETTER
backToLetterButton.addEventListener("click", () => {
  letterSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


// TRASH THE SURPRISE
trashThisButton.addEventListener("click", () => {
  endingActions.classList.add("hidden");
  trashReveal.classList.remove("hidden");

  trashReveal.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});


// UNDO TRASH
undoTrashButton.addEventListener("click", () => {
  trashReveal.classList.add("hidden");
  endingActions.classList.remove("hidden");

  endingActions.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
