window.requestAnimationFrame(writeToPage);
window.onbeforeunload = writeToLocalStorage;

function writeToLocalStorage() {
  const inputFields = document.getElementsByClassName("form-control");
  for (let i = 0; i < inputFields.length; i++) {
    const field = inputFields[i];
    if (field.value) {
      localStorage.setItem(field.id, field.value);
    }
  }
}

function writeToPage() {
  for (let key in localStorage) {
    const el = document.getElementById(key);
    if (el) {
      el.value = localStorage.getItem(key);
    }
  }
}
