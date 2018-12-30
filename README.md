# Maintain State

## Motivation

While conducting behavioral interviews for App Academy and taking notes in a web page, I accidently refreshed the page. The notes that I took didn't persist and the entire page was cleared. This frustrated me because I had to go back after the interview and fill in all of the notes again. To remedy this, I wrote this chrome extension to persist the notes that I take if the page refreshes or the tab closes.

[Chrome extension link](https://chrome.google.com/webstore/detail/ocinlpmickhokdjfbdelndpfgekfglen/)
[LIVE LINK](http://andrewjgregoryajg.com/MaintainState/)

## How does it work?

There are two parts to how the extension works. First, when the page refreshes or closes the inputs' values are saved to local storage. Second, when the page initially loads local storage is examined and the saved inputs' values are written to their corresponding places.

### Saving Inputs to Local Storage

There are radio buttons and inputs/textareas on the page. To gather all of the inputs, I used `document.querySelectorAll`:

```js
function getAllInputs() {
  const textAreas = [...document.querySelectorAll("textarea")];
  const inputs = [...document.querySelectorAll("input")];
  return textAreas.concat(inputs);
}
```

To write these inputs to local storage, I either used the `checked` attribute if the input was a radio button, and the `value` attribute otherwise.

```js
function writeInputsToLocalStorage() {
  const inputFields = getAllInputs();
  inputFields.forEach((field, i) => {
    const value = field.type === "radio" ? field.checked : field.value;
    localStorage.setItem(`field${i}`, value);
  });
}
```

Writing the inputs to the page follows the same conditional logic of whether or not the input is of type `radio` or not.

### Clear Button

There is a large, red clear button in the upper left of the page to aid in clearing `localStorage` and resetting every input. This is useful because when starting a new inteview, the previous interviews values would be loaded into every input field which is annoying because all of the fields would have to be manually cleared.

### Clever Code Snippets

##### Snippet #1

The `getAllInputs` function bothers me because what if there were 1000 `inputTypes`? Would writing 1000 lines of `querySelectorAll` really be necessary? Of course not. It can be written as such:

```js
function getAllInputs() {
  const inputTypes = ["textarea", "input"];
  return inputTypes.reduce(
    (allInputs, selector) =>
      allInputs.concat([...document.querySelectorAll(selector)]),
    [],
  );
}
```

`concat` needs to be used instead of `push` because the latter returns the length of the new array, which would be the incorrect value to use as the accumulator on the next iteration, while the former returns the array with the additional value.

I think the three line `getAllInputs` that explicitly writes out the two calls to `querySelectorAll` is **much** more readable than using reduce above. However, it is interesting to see what would needed to be done if there were thousands of input types.

##### Snippet #2

Writing the inputs to the page required whether or not to check if the input was a radio button or not and then convert the value to a boolean. Clearing the inputs is a little different:

```js
function resetInputFields() {
  getAllInputs().forEach(field => {
    const type = field.type === "radio" ? "checked" : "value";
    field[type] = "";
  });
}
```

Since an empty string is falsy in JavaScript, explicitly setting `false` is not needed and only the correct attribute needs to be determined to reset `textareas`, `inputs` of type text, **and** radio buttons. Awesome!

#### Proof of Concept Logic

To provide a proof of concept such that other people can easily understand this extension was not easy and required a little bit of creativity. I downloaded the original behavioral rubric web page as HTML but using that page was not possible because there are sensitive questions on the page that possible applicants to App Academy have to answer. Uploading that restricted information to GitHub would be very, very bad for App Academy because applicants could study it and ace the interview when they should not have. I had to strip all of the sensitive information from the page _before_ uploading so the admissions process to App Academy is not compromised.

First, I omitted the last half of the page because only a few input fields and radio buttons are necessary to demonstrate the capability of this extension. Next, I had to remove all of the questions. Unfortunately, not only was the text on the page was sensitive and confidential, the `id`s **and** the `for` attributes for labels had sensitive information as well! To omit all of this quickly, I executed the following in the console then re-saved the now safe webpage to upload to GitHub:

```js
document.querySelectorAll('[id^="root_"]').forEach((node, i) => {
  node.id = `root_${i}`;
  node.innerHTML = `question ${i}`;
});

document.querySelectorAll('[for^="root_"]').forEach((node, i) => {
  node.removeAttribute("for");
  node.innerHTML = `form control ${i}`;
});
```
