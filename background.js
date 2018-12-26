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
  const radioBtnRegex = new RegExp("radio[0-9]{1,2}");
  const radioBtnGroups = getRadioBtnGroups();

  for (let key in localStorage) {
    if (radioBtnRegex.test(key)) {
      const radioBtnGroupIdx = parseInt(key.slice(5));
      const radioBtnIdx = parseInt(localStorage[key]);
      radioBtnGroups[radioBtnGroupIdx][radioBtnIdx].checked = true;
    }
  }
}

function writeInputsToLocalStorage() {
  const inputFields = document.getElementsByClassName("form-control");
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
  const radioBtnGroups = getRadioBtnGroups();
  radioBtnGroups.forEach((radioBtnGroup, groupIdx) =>
    [...radioBtnGroup].forEach((radioBtn, checkedRadioBtnIdx) => {
      if (radioBtn.checked) {
        localStorage.setItem(`radio${groupIdx}`, checkedRadioBtnIdx);
      }
    }),
  );
}

function getRadioBtnGroups() {
  return Array.from(document.getElementsByClassName("field-radio-group")).map(
    group => group.getElementsByTagName("input"),
  );
}

function addClearBtn() {
  const button = document.createElement("button");
  button.innerHTML = "CLEAR";
  const style =
    "color: white; background-color: red; border-radius: 10px; position: sticky; top: 0; letter-spacing: 2px; width: 200px; height: 100px; font-size: 55px; display: flex; justify-content: center; border: 0;";
  button.setAttribute("style", style);
  document.querySelector("html").prepend(button);
}
