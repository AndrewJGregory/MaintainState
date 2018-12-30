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
  inputFields.forEach((field, i) =>
    localStorage.setItem(`field${i}`, field.value),
  );
}

function writeInputsToPage() {
  const inputFields = getAllInputFields();
  inputFields.forEach(
    (field, i) => (field.value = localStorage.getItem(`field${i}`)),
  );
}

function writeRadioBtnsToLocalStorage() {
  const allRadioBtns = getAllRadioBtns();
  allRadioBtns.forEach((radioBtn, i) =>
    localStorage.setItem(`radio${i}`, radioBtn.checked),
  );
}

function getAllRadioBtns() {
  return document.querySelectorAll("input[type=radio]");
}

function getAllInputFields() {
  const textAreas = [...document.querySelectorAll("textarea")];
  const inputs = [...document.querySelectorAll("input[type=text]")];
  return textAreas.concat(inputs);
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
  getAllInputFields().forEach(field => (field.value = ""));
}

function resetRadioBtns() {
  getAllRadioBtns().forEach(radioBtn => (radioBtn.checked = false));
}
