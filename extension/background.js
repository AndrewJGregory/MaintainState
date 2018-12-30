window.requestAnimationFrame(writeToPage);
window.onbeforeunload = writeInputsToLocalStorage;

function writeToPage() {
  writeInputsToPage();
  addClearBtn();
}

function writeInputsToLocalStorage() {
  const inputFields = getAllInputs();
  inputFields.forEach((field, i) => {
    const value = field.type === "radio" ? field.checked : field.value;
    localStorage.setItem(`field${i}`, value);
  });
}

function writeInputsToPage() {
  const inputFields = getAllInputs();
  inputFields.forEach((field, i) => {
    if (field.type === "radio") {
      const bool = localStorage.getItem(`field${i}`) === "true";
      field.checked = bool;
    } else {
      field.value = localStorage.getItem(`field${i}`);
    }
  });
}

function getAllInputs() {
  const textAreas = [...document.querySelectorAll("textarea")];
  const inputs = [...document.querySelectorAll("input")];
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
  });
}

function resetInputFields() {
  getAllInputs().forEach(field => {
    const type = field.type === "radio" ? "checked" : "value";
    field[type] = "";
  });
}
