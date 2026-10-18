const openLetterButton = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const showSurpriseButton = document.getElementById("showSurprise");
const surpriseSection = document.getElementById("surpriseSection");
const backToLetterButton = document.getElementById("backToLetter");
const trashThisButton = document.getElementById("trashThis");
const trashReveal = document.getElementById("trashReveal");
const undoTrashButton = document.getElementById("undoTrash");
const endingActions = document.getElementById("endingActions");

openLetterButton.addEventListener("click", () => {
  const isOpen = openLetterButton.classList.contains("is-open");

  if (!isOpen) {
    openLetterButton.classList.add("is-open");
    openLetterButton.setAttribute("aria-label", "Letter opened");
    window.setTimeout(() => {
      letterSection.classList.remove("hidden");
      letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
  } else {
    letterSection.classList.remove("hidden");
    letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

showSurpriseButton.addEventListener("click", () => {
  surpriseSection.classList.remove("hidden");
  surpriseSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

backToLetterButton.addEventListener("click", () => {
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

trashThisButton.addEventListener("click", () => {
  endingActions.classList.add("hidden");
  trashReveal.classList.remove("hidden");
  trashReveal.scrollIntoView({ behavior: "smooth", block: "center" });
});

undoTrashButton.addEventListener("click", () => {
  trashReveal.classList.add("hidden");
  endingActions.classList.remove("hidden");
  endingActions.scrollIntoView({ behavior: "smooth", block: "center" });
});
