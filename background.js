window.requestAnimationFrame(writeToPage);
window.onbeforeunload = writeToLocalStorage;

function writeToPage() {
  writeInputsToPage();
  writeRadioBtnsToPage();
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

  for (let i = 0; i < radioBtnGroups.length; i++) {
    const radioBtnGroup = radioBtnGroups[i];
    let checkedRadioBtnIdx = null;
    for (let j = 0; j < radioBtnGroup.length; j++) {
      const radioBtn = radioBtnGroup[j];
      if (radioBtn.checked) checkedRadioBtnIdx = j;
    }
    localStorage.setItem(`radio${i}`, checkedRadioBtnIdx);
  }
}

function getRadioBtnGroups() {
  return Array.from(document.getElementsByClassName("field-radio-group")).map(
    group => group.getElementsByTagName("input")
  );
}
