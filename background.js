window.requestAnimationFrame(writeToPage);
window.onbeforeunload = writeToLocalStorage;

function writeToPage() {
  writeInputsToPage();
  writeRadioBtnsToPage();
  addClearBtn();
}

function writeToLocalStorage() {
  writeRadioBtnsToLocalStorage();
  writeInputsToLocalStorage();
}

function writeRadioBtnsToPage() {
  const allRadioBtns = getAllRadioBtns();
  allRadioBtns.forEach((radioBtn, i) => {
    const bool = localStorage.getItem(`radio${i}`) === "true";
    radioBtn.checked = bool;
  });
}

function writeInputsToLocalStorage() {
  const inputFields = getAllInputFields();
  for (let i = 0; i < inputFields.length; i++) {
    const field = inputFields[i];
    if (field.value) {
      localStorage.setItem(field.id, field.value);
    }
  }
}

function writeInputsToPage() {
  for (let key in localStorage) {
    const el = document.getElementById(key);
    if (el) {
      el.value = localStorage.getItem(key);
    }
  }
}

function writeRadioBtnsToLocalStorage() {
  const allRadioBtns = getAllRadioBtns();
  allRadioBtns.forEach((radioBtn, i) =>
    localStorage.setItem(`radio${i}`, radioBtn.checked),
  );
}

function getAllRadioBtns() {
  return [...document.querySelectorAll("input[type=radio]")];
}

function getAllInputFields() {
  return [...document.getElementsByClassName("form-control")];
}

function addClearBtn() {
  const button = document.createElement("button");
  button.innerHTML = "CLEAR";
  const style =
    "color: white; background-color: red; border-radius: 10px; position: sticky; top: 0; letter-spacing: 2px; width: 200px; height: 100px; font-size: 55px; display: flex; justify-content: center; border: 0;";
  button.setAttribute("style", style);
  document.querySelector("html").prepend(button);

  button.addEventListener("click", () => {
    localStorage.clear();
    resetInputFields();
    resetRadioBtns();
  });
}

function resetInputFields() {
  const inputFields = document.getElementsByClassName("form-control");
  [...inputFields].forEach(field => (field.value = ""));
}

function resetRadioBtns() {
  const radioBtnGroups = getRadioBtnGroups();
  radioBtnGroups.forEach(group => {
    [...group].forEach(radioBtn => {
      radioBtn.checked = false;
    });
  });
}
