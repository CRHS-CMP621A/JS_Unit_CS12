## Task 7A. DOM Access and Manipulation

Resources: https://javascript.info/searching-elements-dom | https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

Starter Code: [T7A_DOM_Manipulation.html](T7A_DOM_Manipulation.html) and [T7A_DOM_Manipulation.js](T7A_DOM_Manipulation.js)

### Selecting HTML Objects

#### document.querySelector(css)
Use `document.querySelector()` to select the first HTML element that matches a CSS selector.
``` html
<!-- HTML -->
<p class="para">
    JavaScript can be used to manipulate text, html attributes and CSS styles!
</p>

```


```javascript
// javaScript
const para = document.querySelector(".para");
```

`".para"` is a class selector (same style as CSS).

### Observe an HTML object properties in the console
Use `console.dir()` to inspect an element object, including its attributes, properties, and methods.

```javascript
console.dir(para);
```

This helps you discover useful properties like `.textContent`, `.innerHTML`, `.value`, and `.style`.

### Text Elements have a textContent property 
Use `.textContent` to read or replace the visible text inside an element.

```javascript
console.log(para.textContent); // access the text of the HTML element
para.textContent = "Changed by JS"; // changing the text of the HTML element
```

### Input Elements have a value property
Inputs are also HTML elements, so you can select and inspect them the same way.

``` html
<!-- HTML -->
<input type="text" id="input" placeholder="Type something here!" />
```

```javascript
// javaScript
const input = document.querySelector("#input");
console.dir(input);
```

`"#input"` is an id selector.

#### Access and change `.value`
Use `.value` for form controls like text inputs.

```javascript
console.log(input.value);
input.value = "Changed textbox input via JS";
```

#### Access raw HTML content with `.innerHTML`
Use `.innerHTML` to read or change the HTML markup inside an element.

```javascript
const demo = document.querySelector(".demo");
console.log("Demo InnerHTML:", demo.innerHTML);
```

#### Append tags using `.innerHTML`
You can add HTML tags by appending to `.innerHTML`.

```javascript
demo.innerHTML += "<p>This is a new paragraph!</p>";
```

#### Access style and change CSS with JavaScript
Select an element, inspect it, then update its style properties.

```javascript
const box = document.querySelector(".box");
console.dir(box);

box.style.backgroundColor = "lightgreen";
box.style.borderRadius = "30px";
```

Use camelCase for CSS property names in JavaScript:
- `background-color` becomes `backgroundColor`
- `border-radius` becomes `borderRadius`

### Permanant
Changing the .textContent, .value, .innerHTML or .style of an object does not permanently change the HTML file itself. It changes what is displayed in the page while the script runs.